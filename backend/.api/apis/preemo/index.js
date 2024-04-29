"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'preemo/1.0.0 (api/6.1.1)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
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
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
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
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Analyzes text to determine the emotional tone of the message.
     *
     * @summary Sentiment analysis
     * @throws FetchError<4XX, types.AnalyzeSentimentResponse4XX> Error
     */
    SDK.prototype.analyzeSentiment = function (body, metadata) {
        return this.core.fetch('/blocks/analyze-sentiment', 'post', body, metadata);
    };
    /**
     * Answers questions using the provided context.
     *
     * @summary Document question & answer
     * @throws FetchError<4XX, types.GenerateAnswerResponse4XX> Error
     */
    SDK.prototype.generateAnswer = function (body, metadata) {
        return this.core.fetch('/blocks/answer', 'post', body, metadata);
    };
    /**
     * Extracts an entity from the document with the specified fields and types.
     *
     * @summary Entity extraction
     * @throws FetchError<4XX, types.ExtractEntityResponse4XX> Error
     */
    SDK.prototype.extractEntity = function (body, metadata) {
        return this.core.fetch('/blocks/extract', 'post', body, metadata);
    };
    /**
     * Extracts content from the PDF.
     *
     * @summary PDF extraction
     * @throws FetchError<4XX, types.ExtractPdfResponse4XX> Error
     */
    SDK.prototype.extractPdf = function (body, metadata) {
        return this.core.fetch('/blocks/extract-pdf', 'post', body, metadata);
    };
    /**
     * Personalizes the document in a tone and style specific to the described target audience.
     *
     * @summary Document personalization
     * @throws FetchError<4XX, types.PersonalizeDocumentResponse4XX> Error
     */
    SDK.prototype.personalizeDocument = function (body, metadata) {
        return this.core.fetch('/blocks/personalize', 'post', body, metadata);
    };
    /**
     * Generates a summary of the document using the provided guidance.
     *
     * @summary Document summary
     * @throws FetchError<4XX, types.SummarizeDocumentResponse4XX> Error
     */
    SDK.prototype.summarizeDocument = function (body, metadata) {
        return this.core.fetch('/blocks/summarize', 'post', body, metadata);
    };
    /**
     * Gets the result of the audio transcription job.
     *
     * @summary Get audio transcription
     * @throws FetchError<4XX, types.GetAudioTranscriptionResponse4XX> Error
     */
    SDK.prototype.getAudioTranscription = function (metadata) {
        return this.core.fetch('/blocks/transcription', 'get', metadata);
    };
    /**
     * Creates an audio transcription job.
     *
     * @summary Create audio transcription
     * @throws FetchError<4XX, types.CreateAudioTranscriptionResponse4XX> Error
     */
    SDK.prototype.createAudioTranscription = function (body, metadata) {
        return this.core.fetch('/blocks/transcription', 'post', body, metadata);
    };
    /**
     * Lists the currently available embeddings models and provides basic information, such as
     * the slug.
     *
     * @summary List available embeddings models
     * @throws FetchError<4XX, types.ListEmbeddingsResponse4XX> Error
     */
    SDK.prototype.listEmbeddings = function (metadata) {
        return this.core.fetch('/embeddings', 'get', metadata);
    };
    /**
     * Generates normalized embeddings with the given embeddings model.
     *
     * @summary Generate embeddings
     * @throws FetchError<4XX, types.GenerateEmbeddingResponse4XX> Error
     */
    SDK.prototype.generateEmbedding = function (body, metadata) {
        return this.core.fetch('/embeddings/{slug}', 'post', body, metadata);
    };
    /**
     * Stores uploaded file.
     *
     * @summary File upload
     * @throws FetchError<4XX, types.UploadFileResponse4XX> Error
     */
    SDK.prototype.uploadFile = function (body, metadata) {
        return this.core.fetch('/files', 'post', body, metadata);
    };
    /**
     * Lists the currently available models in the selected workspace and provides basic
     * information, such as the model name, ID and whether it is a base or fine-tuned model.
     *
     * @summary List available models
     * @throws FetchError<4XX, types.ListModelsResponse4XX> Error
     */
    SDK.prototype.listModels = function (metadata) {
        return this.core.fetch('/models', 'get', metadata);
    };
    /**
     * Creates a new instance of a model based on a specified model from the existing list.
     *
     * @summary Create model
     * @throws FetchError<4XX, types.CreateModelResponse4XX> Error
     */
    SDK.prototype.createModel = function (body, metadata) {
        return this.core.fetch('/models', 'post', body, metadata);
    };
    /**
     * Deletes the fine-tuned model.
     *
     * @summary Delete model
     * @throws FetchError<4XX, types.DeleteModelResponse4XX> Error
     */
    SDK.prototype.deleteModel = function (metadata) {
        return this.core.fetch('/models/{id}', 'delete', metadata);
    };
    /**
     * Describes the specified model, including the model ID, name, and base model ID.
     *
     * @summary Describe model
     * @throws FetchError<4XX, types.GetModelResponse4XX> Error
     */
    SDK.prototype.getModel = function (metadata) {
        return this.core.fetch('/models/{id}', 'get', metadata);
    };
    /**
     * Completes your fine-tuned model with the specified prompt string. The model will
     * generate a completion.
     *
     * @summary Complete model
     * @throws FetchError<4XX, types.CompleteModelResponse4XX> Error
     */
    SDK.prototype.completeModel = function (body, metadata) {
        return this.core.fetch('/models/{id}/complete', 'post', body, metadata);
    };
    /**
     * Fine-tunes the specified model with your data samples.
     *
     * @summary Fine-tune model
     * @throws FetchError<4XX, types.FineTuneModelResponse4XX> Error
     */
    SDK.prototype.fineTuneModel = function (body, metadata) {
        return this.core.fetch('/models/{id}/fine-tune', 'post', body, metadata);
    };
    /**
     * Lists all RAG collections associated with your workspace.
     *
     * @summary List RAG collections
     * @throws FetchError<4XX, types.ListRagCollectionsResponse4XX> Error
     */
    SDK.prototype.listRagCollections = function (metadata) {
        return this.core.fetch('/rag-collections', 'get', metadata);
    };
    /**
     * Creates a new collection of RAG documents.
     *
     * @summary Create RAG collection
     * @throws FetchError<4XX, types.CreateRagCollectionResponse4XX> Error
     */
    SDK.prototype.createRagCollection = function (body, metadata) {
        return this.core.fetch('/rag-collections', 'post', body, metadata);
    };
    /**
     * Deletes the RAG collection.
     *
     * @summary Delete RAG collection
     * @throws FetchError<4XX, types.DeleteRagCollectionResponse4XX> Error
     */
    SDK.prototype.deleteRagCollection = function (metadata) {
        return this.core.fetch('/rag-collections/{id}', 'delete', metadata);
    };
    /**
     * Gets the RAG collection details.
     *
     * @summary Get RAG collection
     * @throws FetchError<4XX, types.GetRagCollectionResponse4XX> Error
     */
    SDK.prototype.getRagCollection = function (metadata) {
        return this.core.fetch('/rag-collections/{id}', 'get', metadata);
    };
    /**
     * Adds files to the RAG collection.
     *
     * @summary Add files to RAG collection
     * @throws FetchError<4XX, types.AddFilesToRagCollectionResponse4XX> Error
     */
    SDK.prototype.addFilesToRagCollection = function (body, metadata) {
        return this.core.fetch('/rag-collections/{id}/files', 'post', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
