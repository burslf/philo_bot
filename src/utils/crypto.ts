import crypto from 'crypto';

const generate_hash_from_string = (token: string): string => {
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    return hash;
}

export { 
    generate_hash_from_string,
}
