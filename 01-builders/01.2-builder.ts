/**
 * ! Builder Pattern:
 * It is a creational design pattern that allows us to construct complex objects
 * step by step.
 *
 * The pattern allows us to produce different types and representations
 * of an object using the same construction code.
 *
 * * It is useful when we need to construct a complex object with many parts
 * * and we want the construction process to be independent of the parts
 * * that compose it.
 */

import { COLORS } from '../helpers/colors.ts';

//! Task: create a QueryBuilder to construct SQL queries
/**
 * It should have the following methods:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- if no fields are passed, select all with (*)
 * - where(condition: string): QueryBuilder - optional
 * - orderBy(field: string, order: string): QueryBuilder - optional
 * - limit(limit: number): QueryBuilder - optional
 * - execute(): string - returns the SQL query
 * 
 ** Example usage:
  const usersQuery = new QueryBuilder("users") // users is the table name
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Query: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solution

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    if (!table || table.trim() === '') {
      throw new Error('Table name is required');
    }
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    if (fields.length === 0) {
      this.fields = ['*'];
    } else {
      this.fields = fields.filter(field => field && field.trim() !== '');
      if (this.fields.length === 0) {
        this.fields = ['*'];
      }
    }
    return this;
  }

  where(condition: string): QueryBuilder {
    if (condition && condition.trim() !== '') {
      this.conditions.push(condition);
    }
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    if (field && field.trim() !== '') {
      this.orderFields.push(`${field} ${direction}`);
    }
    return this;
  }

  limit(count: number): QueryBuilder {
    if (count > 0) {
      this.limitCount = count;
    }
    return this;
  }

  execute(): string {
    let query = `SELECT ${this.fields.length ? this.fields.join(', ') : '*'} FROM ${this.table}`;

    if (this.conditions.length > 0) {
      query += ` WHERE ${this.conditions.join(' AND ')}`;
    }

    if (this.orderFields.length > 0) {
      query += ` ORDER BY ${this.orderFields.join(', ')}`;
    }

    if (this.limitCount) {
      query += ` LIMIT ${this.limitCount}`;
    }

    return query + ';';
  }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select('id', 'name', 'email')
    .where('age > 18')
    .where("country = 'Cri'")
    .orderBy('name', 'ASC')
    .limit(10)
    .execute();

  console.log('%cQuery:\n', COLORS.red);
  console.log(usersQuery);
}

main();
