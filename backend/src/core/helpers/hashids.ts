import Hashids from 'hashids';

const _hashidsGenerator = new Hashids();

export function toHashids(id: number) {
	return _hashidsGenerator.encode(id);
}
