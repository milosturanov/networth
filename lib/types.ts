"use server";

export type User = {
  id: number;
  name: string;
  currencyId: string;
  networthGoal: number;
  password_hash: string;
};

export type Session = {
  id: number;
  userid: number;
  sessiontoken: string;
  createdat: Date;
};

export type TransactionType = {
  id: string;
  name: string;
};

export type Account = {
  id: number;
  userId: number;
  name: string;
  balance: number;
  createdAt: Date;
  currencyId: string;
  hexCode: string;
};

export type Category = {
  id: number;
  name: string;
  hexCode: string;
  categoryType: string;
};

export type Transaction = {
  id: number;
  name: string;
  userid: number;
  transactiontypeid: string;
  categoryid: number;
  accountid: number;
  amount: number;
  createdat: Date;
};

export type Currency = {
  id: string;
  name: string;
};
