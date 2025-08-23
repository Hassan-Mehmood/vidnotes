// {
//   "data": {
//     "birthday": "",
//     "created_at": 1654012591514,
//     "email_addresses": [
//       {
//         "email_address": "example@example.org",
//         "id": "idn_29w83yL7CwVlJXylYLxcslromF1",
//         "linked_to": [],
//         "object": "email_address",
//         "reserved": true,
//         "verification": {
//           "attempts": null,
//           "expire_at": null,
//           "status": "verified",
//           "strategy": "admin"
//         }
//       }
//     ],
//     "external_accounts": [],
//     "external_id": null,
//     "first_name": "Example",
//     "gender": "",
//     "id": "user_29w83sxmDNGwOuEthce5gg56FcC",
//     "image_url": "https://img.clerk.com/xxxxxx",
//     "last_name": null,
//     "last_sign_in_at": null,
//     "object": "user",
//     "password_enabled": true,
//     "phone_numbers": [],
//     "primary_email_address_id": "idn_29w83yL7CwVlJXylYLxcslromF1",
//     "primary_phone_number_id": null,
//     "primary_web3_wallet_id": null,
//     "private_metadata": {},
//     "profile_image_url": "https://www.gravatar.com/avatar?d=mp",
//     "public_metadata": {},
//     "two_factor_enabled": false,
//     "unsafe_metadata": {},
//     "updated_at": 1654012824306,
//     "username": null,
//     "web3_wallets": []
//   },
//   "event_attributes": {
//     "http_request": {
//       "client_ip": "0.0.0.0",
//       "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
//     }
//   },
//   "object": "event",
//   "timestamp": 1654012824306,
//   "type": "user.updated"
// }

import { WH_Event } from "@/types/webhooks/common";

interface Verification {
    status: string;
    strategy: string;
}

interface EmailAddress {
    email_address: string;
    id: string;
    linked_to: any[];
    object: string;
    verification: Verification;
}

interface Data {
    birthday: string;
    created_at: number;
    email_addresses: EmailAddress[];
    external_accounts: any[];
    external_id: string;
    first_name: string;
    gender: string;
    id: string;
    image_url: string;
    last_name: string;
    last_sign_in_at: number;
    object: string;
    password_enabled: boolean;
    phone_numbers: any[];
    primary_email_address_id: string;
    primary_phone_number_id: string | null;
    primary_web3_wallet_id: string | null;
    private_metadata: Record<string, unknown>;
    profile_image_url: string;
    public_metadata: Record<string, unknown>;
    two_factor_enabled: boolean;
    unsafe_metadata: Record<string, unknown>;
    updated_at: number;
    username: string | null;
    web3_wallets: any[];
}

export interface WH_UserUpdated extends WH_Event {
    data: Data;
}