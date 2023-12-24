import { pgTable, varchar, integer, uniqueIndex } from "drizzle-orm/pg-core";

export const cars = pgTable(
  "cars",
  {
    name: varchar("name", { length: 256 }),
    brand: varchar("brand", { length: 256 }),
    model: varchar("model", { length: 256 }),
    year: integer("year"),
  },
  (cars) => {
    return {
      brandIndex: uniqueIndex("brand_idx").on(cars.brand),
    };
  },
);

export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;
