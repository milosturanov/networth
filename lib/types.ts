"use server";

export type User = {
  id: number;
  name: string;
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
  userid: number;
  name: string;
  balance: number;
  createdat: Date;
};

export type Category = {
  id: number;
  name: string;
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
