declare const AddFilesToRagCollection: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly files: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly required: readonly ["id", "name"];
                };
                readonly maxItems: 20;
            };
        };
        readonly required: readonly ["files"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AnalyzeSentiment: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly document: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The document that will be analyzed to determine the sentiment.";
            };
            readonly examples: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly document: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                        readonly sentiment: {
                            readonly type: "string";
                            readonly enum: readonly ["negative", "neutral", "positive"];
                        };
                    };
                    readonly required: readonly ["document", "sentiment"];
                };
                readonly description: "Example pairs of documents and sentiments.";
            };
        };
        readonly required: readonly ["document"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly sentiment: {
                    readonly type: "string";
                    readonly enum: readonly ["negative", "neutral", "positive"];
                    readonly description: "`negative` `neutral` `positive`";
                };
            };
            readonly required: readonly ["sentiment"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CompleteModel: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly autoTemplate: {
                readonly type: readonly ["boolean", "null"];
                readonly default: true;
                readonly description: "Automatically adds the recommended base model templating.";
            };
            readonly guidance: {
                readonly type: readonly ["object", "null"];
                readonly properties: {
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["choice"];
                    };
                    readonly value: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 32;
                        };
                        readonly minItems: 1;
                        readonly maxItems: 10;
                        readonly description: "The set of possible values that should be generated by the model";
                    };
                };
                readonly required: readonly ["type", "value"];
            };
            readonly maxGeneratedTokenCount: {
                readonly type: readonly ["integer", "null"];
                readonly minimum: 0;
                readonly exclusiveMinimum: true;
                readonly maximum: 512;
                readonly exclusiveMaximum: true;
                readonly description: "The maximum number of tokens to generate.";
            };
            readonly query: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The prompt string you are providing the model, to which the model will generate a completion in response.";
            };
            readonly rag: {
                readonly type: readonly ["object", "null"];
                readonly properties: {
                    readonly collectionId: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly description: "The ID of the RAG collection to retrieve context from before running completion";
                    };
                };
                readonly required: readonly ["collectionId"];
            };
            readonly temperature: {
                readonly type: readonly ["number", "null"];
                readonly description: "This parameter adjusts the degree of randomness in generation. Higher temperature results in more diverse generations.";
            };
            readonly topK: {
                readonly type: readonly ["integer", "null"];
                readonly description: "This parameter ensures that only the top k most likely tokens are considered for generation at each step.";
            };
            readonly topP: {
                readonly type: readonly ["number", "null"];
                readonly description: "This parameter ensures that only the most likely tokens, with total probability mass of p, are considered for generation at each step. If topK is also enabled, topP acts after topK.";
            };
        };
        readonly required: readonly ["query"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly description: "The ID of the base model or fine-tuned model that is being completed.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly finishReason: {
                    readonly type: "string";
                };
                readonly generatedOutput: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["finishReason", "generatedOutput"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly payload: {
                        readonly type: "object";
                        readonly properties: {
                            readonly flaggedContent: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly sample: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly required: readonly ["sample"];
                                };
                            };
                        };
                        readonly required: readonly ["flaggedContent"];
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["flaggedContent"];
                        readonly description: "`flaggedContent`";
                    };
                };
                readonly required: readonly ["message", "payload", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly payload: {
                        readonly type: "object";
                        readonly properties: {
                            readonly formattedValidationError: {
                                readonly nullable: true;
                            };
                            readonly validationError: {};
                        };
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["bodyParsingError"];
                        readonly description: "`bodyParsingError`";
                    };
                };
                readonly required: readonly ["message", "payload", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly payload: {
                        readonly type: "object";
                        readonly properties: {
                            readonly formattedValidationError: {
                                readonly nullable: true;
                            };
                            readonly validationError: {};
                        };
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["queryOrPathParsingError"];
                        readonly description: "`queryOrPathParsingError`";
                    };
                };
                readonly required: readonly ["message", "payload", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["failed"];
                        readonly description: "`failed`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["modelDoesNotSupportGuidance"];
                        readonly description: "`modelDoesNotSupportGuidance`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["noRagDocumentsFound"];
                        readonly description: "`noRagDocumentsFound`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["ragRequiresAutoTemplating"];
                        readonly description: "`ragRequiresAutoTemplating`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["unknownBaseModel"];
                        readonly description: "`unknownBaseModel`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["unknownModelAdapter"];
                        readonly description: "`unknownModelAdapter`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["unknownRagCollection"];
                        readonly description: "`unknownRagCollection`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["unprocessableContent"];
                        readonly description: "`unprocessableContent`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateAudioTranscription: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly fileId: {
                readonly type: "string";
                readonly minLength: 1;
            };
        };
        readonly required: readonly ["fileId"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly transcriptionId: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["transcriptionId"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateModel: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly initialHyperparameters: {
                readonly type: readonly ["object", "null"];
                readonly properties: {
                    readonly loraHyperparameters: {
                        readonly type: readonly ["object", "null"];
                        readonly properties: {
                            readonly rank: {
                                readonly type: readonly ["integer", "null"];
                                readonly minimum: 0;
                                readonly exclusiveMinimum: true;
                                readonly maximum: 32;
                            };
                        };
                    };
                    readonly trainingArguments: {
                        readonly type: readonly ["object", "null"];
                        readonly properties: {
                            readonly learningRate: {
                                readonly type: readonly ["number", "null"];
                                readonly minimum: 0;
                                readonly exclusiveMinimum: true;
                                readonly maximum: 1;
                                readonly exclusiveMaximum: true;
                            };
                        };
                    };
                };
            };
            readonly model: {
                readonly type: "object";
                readonly properties: {
                    readonly baseModelId: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly description: "The foundational model you are creating a new instance of for fine-tuning.";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly description: "What your new fine-tuned model will be called.";
                    };
                };
                readonly required: readonly ["baseModelId", "name"];
            };
        };
        readonly required: readonly ["model"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["id"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateRagCollection: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly files: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly required: readonly ["id", "name"];
                };
                readonly maxItems: 20;
            };
            readonly name: {
                readonly type: "string";
                readonly minLength: 1;
            };
            readonly slug: {
                readonly type: "string";
                readonly enum: readonly ["bge-large"];
            };
        };
        readonly required: readonly ["name", "slug"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["id"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteModel: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly description: "The ID of the model that is being deleted.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteRagCollection: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {};
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ExtractEntity: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly document: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The document from which to extract data.";
            };
            readonly schema: {
                readonly type: "object";
                readonly additionalProperties: {
                    readonly type: "object";
                    readonly properties: {
                        readonly required: {
                            readonly type: readonly ["boolean", "null"];
                            readonly default: false;
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["boolean", "number", "string"];
                        };
                    };
                    readonly required: readonly ["type"];
                };
                readonly description: "The expected schema of the entity result.";
            };
        };
        readonly required: readonly ["document", "schema"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly entity: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly anyOf: readonly [{
                            readonly type: "boolean";
                        }, {
                            readonly type: "number";
                        }, {
                            readonly type: "string";
                        }];
                    };
                };
            };
            readonly required: readonly ["entity"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ExtractPdf: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
            };
        };
        readonly required: readonly ["file"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly pages: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly images: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly data: {
                                            readonly type: "string";
                                        };
                                        readonly format: {
                                            readonly type: "string";
                                            readonly enum: readonly ["base64-png"];
                                            readonly description: "`base64-png`";
                                        };
                                    };
                                    readonly required: readonly ["data", "format"];
                                };
                            };
                            readonly pageNumber: {
                                readonly type: "integer";
                                readonly minimum: 0;
                                readonly exclusiveMinimum: true;
                            };
                            readonly tables: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                        };
                                        readonly tableRows: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly cells: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly cellValue: {
                                                                    readonly type: "string";
                                                                };
                                                                readonly colSpan: {
                                                                    readonly type: readonly ["integer", "null"];
                                                                    readonly minimum: 0;
                                                                    readonly exclusiveMinimum: true;
                                                                };
                                                                readonly rowSpan: {
                                                                    readonly type: readonly ["integer", "null"];
                                                                    readonly minimum: 0;
                                                                    readonly exclusiveMinimum: true;
                                                                };
                                                            };
                                                            readonly required: readonly ["cellValue", "colSpan", "rowSpan"];
                                                        };
                                                    };
                                                    readonly type: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["table_data_row", "table_header"];
                                                        readonly description: "`table_data_row` `table_header`";
                                                    };
                                                };
                                                readonly required: readonly ["cells", "type"];
                                            };
                                        };
                                    };
                                    readonly required: readonly ["name", "tableRows"];
                                };
                            };
                            readonly text: {
                                readonly type: "string";
                            };
                            readonly textBlocks: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly kind: {
                                            readonly type: "string";
                                            readonly enum: readonly ["footer", "header", "section_title", "text", "title"];
                                            readonly description: "`footer` `header` `section_title` `text` `title`";
                                        };
                                        readonly texts: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                    readonly required: readonly ["kind", "texts"];
                                };
                            };
                        };
                        readonly required: readonly ["images", "pageNumber", "tables", "text", "textBlocks"];
                    };
                };
                readonly text: {
                    readonly type: "string";
                };
                readonly title: {
                    readonly type: readonly ["string", "null"];
                };
            };
            readonly required: readonly ["pages", "text", "title"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const FineTuneModel: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly samples: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly fineTuningParameters: {
                            readonly type: readonly ["object", "null"];
                            readonly properties: {
                                readonly multiplier: {
                                    readonly type: readonly ["number", "null"];
                                    readonly minimum: 0;
                                    readonly exclusiveMinimum: true;
                                };
                            };
                        };
                        readonly inputs: {
                            readonly anyOf: readonly [{
                                readonly type: "string";
                                readonly minLength: 1;
                            }, {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly parseSpecialTokens: {
                                            readonly type: "boolean";
                                            readonly default: true;
                                        };
                                        readonly trainable: {
                                            readonly type: "boolean";
                                            readonly default: true;
                                        };
                                        readonly value: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                    };
                                    readonly required: readonly ["value"];
                                };
                            }];
                        };
                    };
                    readonly required: readonly ["inputs"];
                };
            };
        };
        readonly required: readonly ["samples"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly description: "The ID of the model that is being fine-tuned.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly numberOfTrainableTokens: {
                    readonly type: "integer";
                    readonly minimum: 0;
                };
                readonly sumLoss: {
                    readonly type: "number";
                };
            };
            readonly required: readonly ["numberOfTrainableTokens", "sumLoss"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly payload: {
                        readonly type: "object";
                        readonly properties: {
                            readonly formattedValidationError: {
                                readonly nullable: true;
                            };
                            readonly validationError: {};
                        };
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["bodyParsingError"];
                        readonly description: "`bodyParsingError`";
                    };
                };
                readonly required: readonly ["message", "payload", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly payload: {
                        readonly type: "object";
                        readonly properties: {
                            readonly flaggedContent: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly sample: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly required: readonly ["sample"];
                                };
                            };
                        };
                        readonly required: readonly ["flaggedContent"];
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["flaggedContent"];
                        readonly description: "`flaggedContent`";
                    };
                };
                readonly required: readonly ["message", "payload", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly payload: {
                        readonly type: "object";
                        readonly properties: {
                            readonly formattedValidationError: {
                                readonly nullable: true;
                            };
                            readonly validationError: {};
                        };
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["queryOrPathParsingError"];
                        readonly description: "`queryOrPathParsingError`";
                    };
                };
                readonly required: readonly ["message", "payload", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["modelIncapableOfFineTuning"];
                        readonly description: "`modelIncapableOfFineTuning`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["nanLoss"];
                        readonly description: "`nanLoss`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["unknownModelAdapter"];
                        readonly description: "`unknownModelAdapter`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["unprocessableContent"];
                        readonly description: "`unprocessableContent`";
                    };
                };
                readonly required: readonly ["message", "type"];
            }];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GenerateAnswer: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly question: {
                readonly type: "string";
                readonly minLength: 1;
            };
            readonly source: {
                readonly oneOf: readonly [{
                    readonly type: "object";
                    readonly properties: {
                        readonly collectionId: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["rag"];
                        };
                    };
                    readonly required: readonly ["collectionId", "type"];
                    readonly description: "The reference RAG that must be used to answer the question.";
                }, {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["document"];
                        };
                        readonly value: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly required: readonly ["type", "value"];
                    readonly description: "The document that must be used to answer the question.";
                }];
            };
        };
        readonly required: readonly ["question", "source"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly answer: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly ragContext: {
                    readonly type: "object";
                    readonly properties: {
                        readonly documents: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly content: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                    readonly fileName: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                                readonly required: readonly ["content", "fileName"];
                            };
                        };
                    };
                    readonly required: readonly ["documents"];
                };
            };
            readonly required: readonly ["answer"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GenerateEmbedding: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly inputs: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly input: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly required: readonly ["input"];
                };
                readonly minItems: 1;
                readonly maxItems: 256;
            };
        };
        readonly required: readonly ["inputs"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly slug: {
                    readonly type: "string";
                    readonly enum: readonly ["bge-large"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["slug"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly embeddings: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly embedding: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                            readonly index: {
                                readonly type: "integer";
                                readonly minimum: 0;
                            };
                        };
                        readonly required: readonly ["embedding", "index"];
                    };
                };
            };
            readonly required: readonly ["embeddings"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAudioTranscription: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly transcriptionId: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["transcriptionId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly result: {
                        readonly nullable: true;
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["cancelled", "failed", "pending", "pendingCancellation", "running"];
                        readonly description: "`cancelled` `failed` `pending` `pendingCancellation` `running`";
                    };
                };
                readonly required: readonly ["result", "status"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly result: {
                        readonly type: "object";
                        readonly properties: {
                            readonly text: {
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["text"];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["succeeded"];
                        readonly description: "`succeeded`";
                    };
                };
                readonly required: readonly ["result", "status"];
            }];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetModel: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 50;
                    readonly maxLength: 50;
                    readonly description: "The ID of the model that is being described.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly baseModelId: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 50;
                    readonly maxLength: 50;
                };
                readonly latestUpdateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly name: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["modelAdapter"];
                    readonly description: "`modelAdapter`";
                };
            };
            readonly required: readonly ["baseModelId", "id", "latestUpdateTime", "name", "type"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetRagCollection: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly creationTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly files: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["cancelled", "failed", "succeeded", "pending", "pendingCancellation", "running"];
                                readonly description: "`cancelled` `failed` `succeeded` `pending` `pendingCancellation` `running`";
                            };
                        };
                        readonly required: readonly ["id", "name", "status"];
                    };
                };
                readonly latestUpdateTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly name: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly slug: {
                    readonly type: "string";
                    readonly enum: readonly ["bge-large"];
                    readonly description: "`bge-large`";
                };
            };
            readonly required: readonly ["creationTime", "files", "latestUpdateTime", "name", "slug"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListEmbeddings: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly embeddingsModels: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly slug: {
                                readonly type: "string";
                                readonly enum: readonly ["bge-large"];
                                readonly description: "`bge-large`";
                            };
                        };
                        readonly required: readonly ["slug"];
                    };
                };
            };
            readonly required: readonly ["embeddingsModels"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListModels: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly capability: {
                    readonly type: readonly ["string", "null"];
                    readonly enum: readonly ["complete", "fineTune", "any"];
                    readonly default: "fineTune";
                    readonly description: "Only lists the available models with the specified capability.\n\nDefault: `fineTune`";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly onlyBase: {
                    readonly type: readonly ["boolean", "null"];
                    readonly default: false;
                    readonly description: "Only lists the available foundational models. Excludes fine-tuned models.";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly models: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly capabilities: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly enum: readonly ["complete", "fineTune"];
                                        readonly description: "`complete` `fineTune`";
                                    };
                                };
                                readonly id: {
                                    readonly type: "string";
                                    readonly minLength: 50;
                                    readonly maxLength: 50;
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly slug: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["baseModel"];
                                    readonly description: "`baseModel`";
                                };
                            };
                            readonly required: readonly ["capabilities", "id", "name", "slug", "type"];
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly baseModelId: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly id: {
                                    readonly type: "string";
                                    readonly minLength: 50;
                                    readonly maxLength: 50;
                                };
                                readonly latestUpdateTime: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["modelAdapter"];
                                    readonly description: "`modelAdapter`";
                                };
                            };
                            readonly required: readonly ["baseModelId", "id", "latestUpdateTime", "name", "type"];
                        }];
                        readonly discriminator: {
                            readonly propertyName: "type";
                        };
                    };
                };
            };
            readonly required: readonly ["models"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListRagCollections: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly ragCollections: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly creationTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly id: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly latestUpdateTime: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly slug: {
                                readonly type: "string";
                                readonly enum: readonly ["bge-large"];
                                readonly description: "`bge-large`";
                            };
                        };
                        readonly required: readonly ["creationTime", "id", "latestUpdateTime", "name", "slug"];
                    };
                };
            };
            readonly required: readonly ["ragCollections"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PersonalizeDocument: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly audienceDescription: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The description of the audience that the document should be personalized for.";
            };
            readonly document: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The document that will be personalized.";
            };
        };
        readonly required: readonly ["audienceDescription", "document"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly personalizedDocument: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["personalizedDocument"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SummarizeDocument: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly document: {
                readonly type: "string";
                readonly minLength: 1;
                readonly description: "The document to summarize.";
            };
            readonly examples: {
                readonly type: readonly ["array", "null"];
                readonly items: {
                    readonly type: "object";
                    readonly properties: {
                        readonly document: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                        readonly summary: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly required: readonly ["document", "summary"];
                };
                readonly description: "Examples of how to summarize documents.";
            };
            readonly length: {
                readonly type: readonly ["string", "null"];
                readonly enum: readonly ["short", "medium", "long"];
                readonly description: "Roughly how long the summary should be.";
            };
        };
        readonly required: readonly ["document"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly summary: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["summary"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UploadFile: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
            };
        };
        readonly required: readonly ["file"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["audioFile", "ragUserFile"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["type"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "x-gradient-workspace-id": {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
            };
            readonly required: readonly ["x-gradient-workspace-id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["id"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "4XX": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { AddFilesToRagCollection, AnalyzeSentiment, CompleteModel, CreateAudioTranscription, CreateModel, CreateRagCollection, DeleteModel, DeleteRagCollection, ExtractEntity, ExtractPdf, FineTuneModel, GenerateAnswer, GenerateEmbedding, GetAudioTranscription, GetModel, GetRagCollection, ListEmbeddings, ListModels, ListRagCollections, PersonalizeDocument, SummarizeDocument, UploadFile };
