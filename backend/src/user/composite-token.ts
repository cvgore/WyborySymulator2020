export default class CompositeToken {
	token!: string;

	ts!: number;

	static equals(composite: CompositeToken | null, another: CompositeToken): boolean {
		return composite !== null
			&& another.token === composite.token
			&& another.ts === composite.ts;
	}
}
