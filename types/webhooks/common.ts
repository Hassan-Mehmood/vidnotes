interface HttpRequest {
    client_ip: string;
    user_agent: string;
}

interface EventAttributes {
    http_request: HttpRequest;
}

export interface WH_Event {
    event_attributes: EventAttributes;
    object: string; // should be "event"
    timestamp: number;
    type: string; // e.g. "user.created"
}