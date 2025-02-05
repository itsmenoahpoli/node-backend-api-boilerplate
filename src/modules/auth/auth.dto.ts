import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export type SigninCredentials = {
  email: string;
  password: string;
};

export class SigninCredentialsDTO implements SigninCredentials {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
