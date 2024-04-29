import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Analyzes text to determine the emotional tone of the message.
     *
     * @summary Sentiment analysis
     * @throws FetchError<4XX, types.AnalyzeSentimentResponse4XX> Error
     */
    analyzeSentiment(body: types.AnalyzeSentimentBodyParam, metadata: types.AnalyzeSentimentMetadataParam): Promise<FetchResponse<200, types.AnalyzeSentimentResponse200>>;
    /**
     * Answers questions using the provided context.
     *
     * @summary Document question & answer
     * @throws FetchError<4XX, types.GenerateAnswerResponse4XX> Error
     */
    generateAnswer(body: types.GenerateAnswerBodyParam, metadata: types.GenerateAnswerMetadataParam): Promise<FetchResponse<200, types.GenerateAnswerResponse200>>;
    /**
     * Extracts an entity from the document with the specified fields and types.
     *
     * @summary Entity extraction
     * @throws FetchError<4XX, types.ExtractEntityResponse4XX> Error
     */
    extractEntity(body: types.ExtractEntityBodyParam, metadata: types.ExtractEntityMetadataParam): Promise<FetchResponse<200, types.ExtractEntityResponse200>>;
    /**
     * Extracts content from the PDF.
     *
     * @summary PDF extraction
     * @throws FetchError<4XX, types.ExtractPdfResponse4XX> Error
     */
    extractPdf(body: types.ExtractPdfBodyParam, metadata: types.ExtractPdfMetadataParam): Promise<FetchResponse<200, types.ExtractPdfResponse200>>;
    /**
     * Personalizes the document in a tone and style specific to the described target audience.
     *
     * @summary Document personalization
     * @throws FetchError<4XX, types.PersonalizeDocumentResponse4XX> Error
     */
    personalizeDocument(body: types.PersonalizeDocumentBodyParam, metadata: types.PersonalizeDocumentMetadataParam): Promise<FetchResponse<200, types.PersonalizeDocumentResponse200>>;
    /**
     * Generates a summary of the document using the provided guidance.
     *
     * @summary Document summary
     * @throws FetchError<4XX, types.SummarizeDocumentResponse4XX> Error
     */
    summarizeDocument(body: types.SummarizeDocumentBodyParam, metadata: types.SummarizeDocumentMetadataParam): Promise<FetchResponse<200, types.SummarizeDocumentResponse200>>;
    /**
     * Gets the result of the audio transcription job.
     *
     * @summary Get audio transcription
     * @throws FetchError<4XX, types.GetAudioTranscriptionResponse4XX> Error
     */
    getAudioTranscription(metadata: types.GetAudioTranscriptionMetadataParam): Promise<FetchResponse<200, types.GetAudioTranscriptionResponse200>>;
    /**
     * Creates an audio transcription job.
     *
     * @summary Create audio transcription
     * @throws FetchError<4XX, types.CreateAudioTranscriptionResponse4XX> Error
     */
    createAudioTranscription(body: types.CreateAudioTranscriptionBodyParam, metadata: types.CreateAudioTranscriptionMetadataParam): Promise<FetchResponse<200, types.CreateAudioTranscriptionResponse200>>;
    /**
     * Lists the currently available embeddings models and provides basic information, such as
     * the slug.
     *
     * @summary List available embeddings models
     * @throws FetchError<4XX, types.ListEmbeddingsResponse4XX> Error
     */
    listEmbeddings(metadata: types.ListEmbeddingsMetadataParam): Promise<FetchResponse<200, types.ListEmbeddingsResponse200>>;
    /**
     * Generates normalized embeddings with the given embeddings model.
     *
     * @summary Generate embeddings
     * @throws FetchError<4XX, types.GenerateEmbeddingResponse4XX> Error
     */
    generateEmbedding(body: types.GenerateEmbeddingBodyParam, metadata: types.GenerateEmbeddingMetadataParam): Promise<FetchResponse<200, types.GenerateEmbeddingResponse200>>;
    /**
     * Stores uploaded file.
     *
     * @summary File upload
     * @throws FetchError<4XX, types.UploadFileResponse4XX> Error
     */
    uploadFile(body: types.UploadFileBodyParam, metadata: types.UploadFileMetadataParam): Promise<FetchResponse<200, types.UploadFileResponse200>>;
    /**
     * Lists the currently available models in the selected workspace and provides basic
     * information, such as the model name, ID and whether it is a base or fine-tuned model.
     *
     * @summary List available models
     * @throws FetchError<4XX, types.ListModelsResponse4XX> Error
     */
    listModels(metadata: types.ListModelsMetadataParam): Promise<FetchResponse<200, types.ListModelsResponse200>>;
    /**
     * Creates a new instance of a model based on a specified model from the existing list.
     *
     * @summary Create model
     * @throws FetchError<4XX, types.CreateModelResponse4XX> Error
     */
    createModel(body: types.CreateModelBodyParam, metadata: types.CreateModelMetadataParam): Promise<FetchResponse<200, types.CreateModelResponse200>>;
    /**
     * Deletes the fine-tuned model.
     *
     * @summary Delete model
     * @throws FetchError<4XX, types.DeleteModelResponse4XX> Error
     */
    deleteModel(metadata: types.DeleteModelMetadataParam): Promise<FetchResponse<200, types.DeleteModelResponse200>>;
    /**
     * Describes the specified model, including the model ID, name, and base model ID.
     *
     * @summary Describe model
     * @throws FetchError<4XX, types.GetModelResponse4XX> Error
     */
    getModel(metadata: types.GetModelMetadataParam): Promise<FetchResponse<200, types.GetModelResponse200>>;
    /**
     * Completes your fine-tuned model with the specified prompt string. The model will
     * generate a completion.
     *
     * @summary Complete model
     * @throws FetchError<4XX, types.CompleteModelResponse4XX> Error
     */
    completeModel(body: types.CompleteModelBodyParam, metadata: types.CompleteModelMetadataParam): Promise<FetchResponse<200, types.CompleteModelResponse200>>;
    /**
     * Fine-tunes the specified model with your data samples.
     *
     * @summary Fine-tune model
     * @throws FetchError<4XX, types.FineTuneModelResponse4XX> Error
     */
    fineTuneModel(body: types.FineTuneModelBodyParam, metadata: types.FineTuneModelMetadataParam): Promise<FetchResponse<200, types.FineTuneModelResponse200>>;
    /**
     * Lists all RAG collections associated with your workspace.
     *
     * @summary List RAG collections
     * @throws FetchError<4XX, types.ListRagCollectionsResponse4XX> Error
     */
    listRagCollections(metadata: types.ListRagCollectionsMetadataParam): Promise<FetchResponse<200, types.ListRagCollectionsResponse200>>;
    /**
     * Creates a new collection of RAG documents.
     *
     * @summary Create RAG collection
     * @throws FetchError<4XX, types.CreateRagCollectionResponse4XX> Error
     */
    createRagCollection(body: types.CreateRagCollectionBodyParam, metadata: types.CreateRagCollectionMetadataParam): Promise<FetchResponse<200, types.CreateRagCollectionResponse200>>;
    /**
     * Deletes the RAG collection.
     *
     * @summary Delete RAG collection
     * @throws FetchError<4XX, types.DeleteRagCollectionResponse4XX> Error
     */
    deleteRagCollection(metadata: types.DeleteRagCollectionMetadataParam): Promise<FetchResponse<200, types.DeleteRagCollectionResponse200>>;
    /**
     * Gets the RAG collection details.
     *
     * @summary Get RAG collection
     * @throws FetchError<4XX, types.GetRagCollectionResponse4XX> Error
     */
    getRagCollection(metadata: types.GetRagCollectionMetadataParam): Promise<FetchResponse<200, types.GetRagCollectionResponse200>>;
    /**
     * Adds files to the RAG collection.
     *
     * @summary Add files to RAG collection
     * @throws FetchError<4XX, types.AddFilesToRagCollectionResponse4XX> Error
     */
    addFilesToRagCollection(body: types.AddFilesToRagCollectionBodyParam, metadata: types.AddFilesToRagCollectionMetadataParam): Promise<FetchResponse<200, types.AddFilesToRagCollectionResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
