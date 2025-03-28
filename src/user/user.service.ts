import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: [{ email: dto.email }],
      });

      if (existingUser) {
        throw new ConflictException(
          'User with such username or email already exists',
        );
      }

      const user = this.userRepository.create(dto);

      return this.userRepository.save(user);
    } catch (e) {
      this.logger.error('Error creating user', e);
      throw new ConflictException('Error creating user');
    }
  }

  async delete(id: number): Promise<void> {
    const isUserExists = await this.userRepository.exists({
      where: { id },
    });

    if (!isUserExists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepository.delete(id);
  }
}
