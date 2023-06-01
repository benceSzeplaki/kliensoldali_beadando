export function getAuthorizationHeader(token) {
    if ( token ) {
        return {
            "Authorization" : "Bearer " + token
        };
    } else {
        return "";
    }
}