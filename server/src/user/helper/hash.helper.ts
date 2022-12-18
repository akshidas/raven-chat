import { hash } from 'bcrypt';

export const genHash = async (plainString: string) => {
  try {
    const hashedPassword = await hash(plainString, 10);
    if (hashedPassword) {
      return hashedPassword;
    }

    return false;
  } catch (err) {
    return false;
  }
};
