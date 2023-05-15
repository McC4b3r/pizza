-- CreateTable
CREATE TABLE "_pizzasTotoppings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_pizzasTotoppings_AB_unique" ON "_pizzasTotoppings"("A", "B");

-- CreateIndex
CREATE INDEX "_pizzasTotoppings_B_index" ON "_pizzasTotoppings"("B");

-- AddForeignKey
ALTER TABLE "_pizzasTotoppings" ADD CONSTRAINT "_pizzasTotoppings_A_fkey" FOREIGN KEY ("A") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_pizzasTotoppings" ADD CONSTRAINT "_pizzasTotoppings_B_fkey" FOREIGN KEY ("B") REFERENCES "toppings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
