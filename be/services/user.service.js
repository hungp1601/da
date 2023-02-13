"use strict";
const SequelizeAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "users",
	adapter: new SequelizeAdapter({
		username: "root",
		password: "",
		database: "test",
		dialect: "mysql",
	}),

	model: {
		name: "users",
		define: {
			_id: {
				type: Sequelize.TEXT,
				primaryKey: true,
			},
			name: Sequelize.TEXT,
			email: Sequelize.TEXT,
			birthday: Sequelize.TEXT,
			hometown: Sequelize.TEXT,
			gender: Sequelize.TEXT,
			number: Sequelize.TEXT,
		},
		options: {},
	},
	settings: {
		// Available fields in the responses
		fields: [
			"_id",
			"name",
			"email",
			"birthday",
			"hometown",
			"gender",
			"number",
		],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
			name: "string",
			email: "string",
			birthday: "string",
			hometown: "string",
			gender: "string",
			number: "string",
		},
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */
		getAllUsers: {
			rest: "GET",

			async handler(ctx) {
				const docs = await this.adapter.find({});
				const json = await this.transformDocuments(
					ctx,
					ctx.params,
					docs
				);
				await this.entityChanged("created", json, ctx);

				return json;
			},
		},
		getUser: {
			rest: "GET /:id",
			/** @param {Context} ctx */
			async handler(ctx) {
				const doc = await this.adapter.findById(ctx.params.id);
				const json = await this.transformDocuments(
					ctx,
					ctx.params,
					doc
				);
				await this.entityChanged("created", json, ctx);

				return json;
			},
		},
		createUser: {
			rest: "POST",
			params: {
				name: "string",
				email: "string",
				birthday: "string",
				hometown: "string",
				gender: "string",
				number: "string",
			},
			/** @param {Context} ctx */
			async handler(ctx) {
				const doc = await this.adapter.create({
					name: ctx.params.name,
					email: ctx.params.email,
					birthday: ctx.params.birthday,
					hometown: ctx.params.hometown,
					gender: ctx.params.gender,
					number: ctx.params.number,
				});
				const json = await this.transformDocuments(
					ctx,
					ctx.params,
					doc
				);
				await this.entityChanged("updated", json, ctx);

				return json;
			},
		},
		deleteById: {
			rest: "DELETE /:id",
			params: {
				id: "string",
			},
			/** @param {Context} ctx */
			async handler(ctx) {
				const doc = await this.adapter.deleteById(ctx.params.id);

				const json = await this.transformDocuments(
					ctx,
					ctx.params,
					doc
				);
				await this.entityChanged("deleted", json, ctx);

				return json;
			},
		},
		updateById: {
			rest: "PUT /:id",
			params: {
				id: "string",
				name: "string",
				email: "string",
				birthday: "string",
				hometown: "string",
				gender: "string",
				number: "string",
			},
			/** @param {Context} ctx */
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, {
					name: ctx.params.name,
					email: ctx.params.email,
					birthday: ctx.params.birthday,
					hometown: ctx.params.hometown,
					gender: ctx.params.gender,
					number: ctx.params.number,
				});
				const json = await this.transformDocuments(
					ctx,
					ctx.params,
					doc
				);
				await this.entityChanged("updated", json, ctx);

				return json;
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
			await this.adapter.insertMany([
				{
					name: "John Doe",
					email: "johndoe@example.com",
					birthday: "1995-12-20",
					hometown: "New York",
					gender: "Male",
					number: 123456789,
				},
				{
					name: "Jane Doe",
					email: "janedoe@example.com",
					birthday: "1997-01-15",
					hometown: "California",
					gender: "Female",
					number: 987654321,
				},
				{
					name: "Bob Smith",
					email: "bobsmith@example.com",
					birthday: "2000-05-10",
					hometown: "Texas",
					gender: "Male",
					number: 111111111,
				},
			]);
		},
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};
