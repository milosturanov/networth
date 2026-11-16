"use client";

type NetworthLast6 = {
  year: number;
  month: number;
  networth: number;
  isUser: boolean;
};

export function CompleteNetworth(NetworthLast6: NetworthLast6[]) {
  const date = new Date();
  let year: number;
  let month: number;

  let networth: number;

  const lastEntry = NetworthLast6.at(-1);

  if (lastEntry) {
    month = lastEntry.month;
    year = lastEntry.year;
    networth = lastEntry.networth;
  } else {
    year = date.getFullYear();
    month = date.getMonth() + 1;
    networth = 10000;

    NetworthLast6.push({
      year: year,
      month: month,
      networth: networth,
      isUser: false,
    });
  }

  while (NetworthLast6.length != 6) {
    month++;
    networth = networth * 1.45;

    if (month === 13) {
      month = 1;
      year += 1;
    }

    NetworthLast6.push({
      year: year,
      month: month,
      networth: networth,
      isUser: false,
    });
  }

  return NetworthLast6;
}
