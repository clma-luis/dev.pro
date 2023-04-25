import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(UserService.prototype.create, () => {
    it('should success', () => {
       const userDto: CreateUserDto = {
        firstName: 'test',
        lastName: 'test 2',
        email: 'test@hormail.com',
        password: 'test',
      };

      const createdUser =  service.create(userDto);

      expect(createdUser.id).toBeDefined();
      expect(createdUser.firstName).toBe(userDto.firstName);
      expect(createdUser.email).toEqual(userDto.email);
      expect(createdUser.password).toEqual(userDto.password);
    });
    it('should fail', () => {
      const userDto: any = {
        firstName: 0,
        lastName: undefined,
        email: 'test@hormail.com',
        password: 'test',
      };

      const createdUser =  service.create(userDto);

      expect(!!createdUser.firstName).toBeFalsy();
      expect(createdUser.lastName).toBeUndefined();

    });
  }) 

  describe(UserService.prototype.update, () => {
    it('should success', () => {
      const id = "f15fa22b-0274-4d31-95de-3c1a74922006"
      const userDto: CreateUserDto = {
        firstName: 'test',
        lastName: 'test 2',
        email: 'test@hormail.com',
        password: 'test',
      };

      const createdUser =  service.update(id, userDto);


      
      expect(!createdUser).toBeFalsy();
      
      
    });

  }) 

  describe('findOne', () => {
    it('should return a user', () => {
      const userDto = {
        firstName: 'test',
        email: 'test@hormail.com',
        password: 'test',
      };

      const createdUser =  service.create(userDto);

      expect(createdUser.firstName).toEqual(userDto.firstName);
      expect(createdUser.email).toEqual(userDto.email);
      expect(createdUser.password).toEqual(userDto.password);

      expect( service.findOne(createdUser.id)).toBe(createdUser);
    });
  });


  describe(UserService.prototype.remove, () => {
    it('should success', () => {});
   
  }) 

  describe(UserService.prototype.findAll, () => {
    it('should success', () => {});
   
  }) 
});
