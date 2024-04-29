import React from 'react';
import { Upload, message, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FileUploadService, AddToRAGCollection } from '../../services/FileUploadServices';

const { Dragger } = Upload;

const UploadComponent = () => {
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
            const { file } = info;
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await FileUploadService(formData);
                const { id, ogName } = response.data
                const responseRAG = await AddToRAGCollection({
                    id,
                    ogName
                })
                console.log(responseRAG)
                message.success(`File uploaded successfully`);
            } catch (error) {
                message.error('File upload failed');
            }
        },
    };

    return (
        <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="text-white">
                Click or drag file to this area to upload
            </p>
            <p className="text-white">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other banned files.
            </p>
        </Dragger>
    );
};

export default UploadComponent;
