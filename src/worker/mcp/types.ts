// JSON-RPC 2.0 Types
export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number | null; // undefined for notifications (requests without response)
  method: string;
  params?: unknown;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: JsonRpcError;
}

export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

// JSON-RPC Error Codes
export const JSON_RPC_ERROR_CODES = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
} as const;

// MCP Protocol Types
export interface InitializeParams {
  protocolVersion: string;
  capabilities?: {
    tools?: {};
    resources?: {};
    prompts?: {};
  };
  clientInfo?: {
    name: string;
    version: string;
  };
}

export interface InitializeResult {
  protocolVersion: string;
  capabilities: {
    tools?: {
      listChanged?: boolean;
    };
    resources?: {
      subscribe?: boolean;
      listChanged?: boolean;
    };
    prompts?: {
      listChanged?: boolean;
    };
  };
  serverInfo: {
    name: string;
    version: string;
  };
}

export interface Tool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export interface ToolCallParams {
  name: string;
  arguments?: unknown;
}

export interface ToolCallResult {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}

// Server Capabilities
export interface ServerCapabilities {
  tools: {
    listChanged?: boolean;
  };
}
