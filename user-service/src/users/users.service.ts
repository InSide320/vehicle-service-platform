import { PrismaService } from "../prisma/index.js";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	create(createUserDto: CreateUserDto) {
		return "This action adds a new user";
	}

	async findAll() {
		return await this.prisma.user.findMany();
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
