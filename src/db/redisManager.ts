import { redisClient } from "../config/redis.js";

const setValue = async (key: string, value: string) => {
  await redisClient.v4.set(key, value, "EX");
};

const getValue = async (key: string) => {
  return redisClient.v4.get(key);
};

const setArray = async (key: string, array: string[]) => {
  const arrayString = JSON.stringify(array);
  await redisClient.v4.set(key, arrayString, "EX");
};

const getArray = async (key: string) => {
  const arrayString = await redisClient.v4.get(key);
  return arrayString ? JSON.parse(arrayString) : null;
};

const deleteValue = async (key: string) => {
  await redisClient.v4.del(key);
};

const setExpire = async (key: string, ttl: string) => {
  return redisClient.v4.expire(key, ttl);
};

export { setValue, getValue, deleteValue, setArray, getArray, setExpire };
