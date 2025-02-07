import { IsNotEmpty, IsEmail, IsString, IsOptional } from "class-validator";

export type SigninCredentials = {
	email: string;
	password: string;
};

export type SignupData = {
	firstName: string;
	middleName?: string;
	lastName: string;
} & SigninCredentials;

export class SigninCredentialsDTO implements SigninCredentials {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}

export class SignupDataDTO extends SigninCredentialsDTO implements SignupData {
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsOptional()
	@IsString()
	middleName?: string;

	@IsNotEmpty()
	@IsString()
	lastName: string;
}
