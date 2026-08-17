import type { IncomingMessage, ServerResponse } from 'node:http';

/** Handles /api/comments; returns false when the request is something else. */
export function handleCommentsApi(req: IncomingMessage, res: ServerResponse): boolean;
