import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Spin, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons';

import { MultipleFileUpload } from '../../services/FileUploadServices';

const { Dragger } = Upload

const RagUpload = () => {
    const [activeState, setActiveState] = useState(0)
    const [fileArray, setFileArray] = useState([])
    const [done, setDone] = useState(false)

    const username = localStorage.getItem("user");

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem("ragCollectionID")
    }, [])

    const handleFileUpload = async () => {
        // console.log(fileArray)

        const formData = new FormData();
        fileArray.map(file => formData.append('files', file))
        formData.append('ragCollectionName', `${username}-${Date.now()}`)
        // console.log(formData.getAll('files'))
        try {
            const response = await MultipleFileUpload(formData)
            const successfullyUploadedFiles = [ ...response.data.success ]
            if (response.status === 201) { // Some files caused upload issue
                const failureFiles = response.data.failure.map(({ ogName }) => ogName)
                if (successfullyUploadedFiles.length === 0) {
                    message.error("Please upload valid documents")
                } else {
                    message.info(`All files except ${failureFiles.join(', ')} are uploaded`)
                }
            } else {  // Successfull Upload
                message.success("All files are successfully uploaded")
            }
            console.log(successfullyUploadedFiles)
            console.log(response.data.ragCollectionID)
            localStorage.setItem("ragCollectionID", response.data.ragCollectionID)
            if (successfullyUploadedFiles.length > 0) {
                navigate('/chat')
            } else {
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
        } catch (e) {
            return e
        }
    }
    useEffect(() => {
        if (done) {
            handleFileUpload()
            setDone(false)
        }
    }, [done])

    // Configuration for Dragger
    const draggerProps = {
        name: 'file', // This should match the form data field name
        multiple: true, // Set to true if you want to allow multiple files
        action: null, // We're not using this, since we handle the upload manually
        beforeUpload: (file) => {
            // Prevent default behavior to handle the upload manually
            return false;
        },
        onChange: async (info) => {
            setActiveState(1)
            // setLoading(true)
            // console.log(info)
            const { fileList } = info;
            const originalFileObjectsArray = fileList.map(file => file.originFileObj)
            setFileArray(originalFileObjectsArray)
            setDone(true)
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
                {/* <p className="text-white">
                    Must be an audio file no larger than 150 MiB. 
                </p> */}
            </Dragger>
        ) : (
            <div className='flex flex-col justify-center h-full'>
                <Spin tip="Uploading File to a new RAG Collection" size="large">
                    <div className="content" />
                </Spin>
            </div>
        )
    );
}

export default RagUpload