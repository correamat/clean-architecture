import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";

export class ProductRepositoryPrisma implements ProductGateway {
    private constructor(private readonly prismaClient: PrismaClient) {

    }

    public static create(prismaClient: PrismaClient) {
        return new ProductRepositoryPrisma(prismaClient);
    }
    
    public async save(product: Product): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        };

        await this.prismaClient.product.create({ data });
    }

    public async list(): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany();

        const productList = products.map((item) => {
            const product = Product.with({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            });

            return product;
        });

        return productList;
    }
}