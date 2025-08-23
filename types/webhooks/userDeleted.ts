// {
//   "data": {
//     "deleted": true,
//     "id": "user_29wBMCtzATuFJut8jO2VNTVekS4",
//     "object": "user"
//   },
//   "event_attributes": {
//     "http_request": {
//       "client_ip": "0.0.0.0",
//       "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
//     }
//   },
//   "object": "event",
//   "timestamp": 1661861640000,
//   "type": "user.deleted"
// }

import { WH_Event } from "@/types/webhooks/common";

interface Data {
    deleted: boolean;
    id: string;
    object: string;
}

export interface WH_UserDeleted extends WH_Event {
    data: Data;
}