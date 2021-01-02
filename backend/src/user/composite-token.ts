export default class CompositeToken {
	token!: string;

	ts!: number;

	static equals(composite: CompositeToken, another: CompositeToken): boolean {
		return another.token === composite.token
			&& another.ts === composite.ts;
	}
}
