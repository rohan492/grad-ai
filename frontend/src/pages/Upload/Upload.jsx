import React, { useState } from 'react';
import { Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FileUploadService, AddToRAGCollection, GetTranscriptionID, GetAudioTranscription } from '../../services/FileUploadServices';
import UploadTranscriptionChat from '../../components/UploadTranscriptionChat/UploadTranscriptionChat';

const { Dragger } = Upload;

const UploadComponent = () => {
    const [transcriptionData, setTranscriptionData] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeState, setActiveState] = useState(0)

    // Configuration for Dragger
    const draggerProps = {
        name: 'file', // This should match the form data field name
        multiple: false, // Set to true if you want to allow multiple files
        action: null, // We're not using this, since we handle the upload manually
        beforeUpload: (file) => {
            // Prevent default behavior to handle the upload manually
            return false;
        },
        onChange: async (info) => {
            setLoading(true)
            setActiveState(1)
            const { file } = info;
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await FileUploadService(formData);
                const { id, ogName } = response.data
                const question = "Transcribe " + ogName
                setTranscriptionData([{
                    question
                }])
                setActiveState(2)
                const responseTranscriptionID = await GetTranscriptionID({
                    id
                })
                const { transcriptionId } = responseTranscriptionID.data

                // message.info("Transcripting Audio File")
                let transcriptionStatus = "running";
                let responseAudioTranscription;

                const POLLING_INTERVAL = 5000; // Poll every 5 seconds
                while (transcriptionStatus === "running") {
                    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL)); // Delay

                    try {
                        responseAudioTranscription = await GetAudioTranscription({ transcriptionId });
                        transcriptionStatus = responseAudioTranscription.data.status;

                        console.log("Transcription status:", transcriptionStatus);
                    } catch (err) {
                        console.error("Error checking transcription status:", err);
                        message.error("Error checking transcription status.");
                        throw err; // Rethrow to catch in the outer try-catch
                    }
                }

                if (transcriptionStatus === "succeeded") {
                    const transcribedText = responseAudioTranscription?.data?.result?.text
                    console.log("Transcription data:", transcribedText);
                    console.log("Transcribed file name:", ogName);
                    setTranscriptionData(prevTransData => {
                        const lastIndex = prevTransData.length - 1
                        return [
                            ...prevTransData.slice(0, lastIndex),
                            {
                                ...prevTransData[lastIndex],
                                answer: transcribedText
                            }
                        ]
                    })
                    // message.success("File Transcribed Successfully");
                } else if (transcriptionStatus === "failed") {
                    message.error("Transcription failed");
                }
            } catch (error) {
                message.error('File upload failed');
            }

            setLoading(false)
        },
    };

    return (
        activeState === 0 ? (
            <Dragger {...draggerProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="text-white">
                    Click or drag file to this area to upload
                </p>
                <p className="text-white">
                    Must be an audio file no larger than 150 MiB. 
                </p>
            </Dragger>
        ) : activeState === 1 ? (
            <div className='flex flex-col justify-center h-full'>
                <Spin tip="Uploading File for Transcription" size="large">
                    <div className="content" />
                </Spin>
            </div>
        ) : (
            <UploadTranscriptionChat 
                chatArray={transcriptionData}
                loading={loading}
            />
        )
    );
};

export default UploadComponent;
