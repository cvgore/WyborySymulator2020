import Hashids from 'hashids';

const _hashidsGenerator = new Hashids(process.env.HASHIDS_SALT, 10);

export function toHashids(id: number): string {
	return _hashidsGenerator.encode(id);
}

export function fromHashids(id: string) {
	return _hashidsGenerator.decode(id);
}
