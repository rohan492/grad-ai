import React, { useState } from 'react'
import { Upload, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import UploadTranscriptionChat from '../../components/UploadTranscriptionChat/UploadTranscriptionChat';

import { PDFExtraction, GetSummary } from '../../services/SummaryServices.js'

const { Dragger } = Upload

const Summary = () => {
    const [summarizationData, setSummarizationData] = useState([])
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
            console.log(file.name)
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await PDFExtraction(formData);
                const extractedTextFromPDF = response.data
                let question, summaryReceived, responseSummarization
                question = "Give me a short length summary of " + file.name
                setSummarizationData([{
                    question
                }])
                setActiveState(2)
                responseSummarization = await GetSummary({
                    extractedTextFromPDF,
                    length: 'short'
                })
                summaryReceived = responseSummarization.data
                question = "Give me a medium length summary of " + file.name
                setSummarizationData(prevSummarizationData => {
                    const lastIndex = prevSummarizationData.length - 1
                    return [
                        ...prevSummarizationData.slice(0, lastIndex),
                        {
                            ...prevSummarizationData[lastIndex],
                            answer: summaryReceived
                        },
                        {
                            question
                        }
                    ]
                })
                responseSummarization = await GetSummary({
                    extractedTextFromPDF,
                    length: 'medium'
                })
                summaryReceived = responseSummarization.data
                question = "Give me a long length summary of " + file.name
                setSummarizationData(prevSummarizationData => {
                    const lastIndex = prevSummarizationData.length - 1
                    return [
                        ...prevSummarizationData.slice(0, lastIndex),
                        {
                            ...prevSummarizationData[lastIndex],
                            answer: summaryReceived
                        },
                        {
                            question
                        }
                    ]
                })
                responseSummarization = await GetSummary({
                    extractedTextFromPDF,
                    length: 'long'
                })
                summaryReceived = responseSummarization.data
                setSummarizationData(prevSummarizationData => {
                    const lastIndex = prevSummarizationData.length - 1
                    return [
                        ...prevSummarizationData.slice(0, lastIndex),
                        {
                            ...prevSummarizationData[lastIndex],
                            answer: summaryReceived
                        }
                    ]
                })
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
                    Must be a PDF no larger than 2 MB. 
                </p>
            </Dragger>
        ) : activeState === 1 ? (
            <div className='flex flex-col justify-center h-full'>
                <Spin tip="Uploading File for Summarization" size="large">
                    <div className="content" />
                </Spin>
            </div>
        ) : (
            <UploadTranscriptionChat 
                chatArray={summarizationData}
                loading={loading}
            />
        )
    );
}

export default Summary