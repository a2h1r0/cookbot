import { Substitution } from '@/types';

export const mockSubstitutions: { [key: string]: Substitution } = {
  薄力粉: {
    substitute: '米粉',
    amount: '100g',
  },
  牛乳: {
    substitute: '豆乳',
    amount: '200ml',
  },
  バター: {
    substitute: 'オリーブオイル',
    amount: '80ml',
  },
  ベーキングパウダー: {
    substitute: '重曹 + クリームタータ',
    amount: '小さじ1/2ずつ',
  },
  砂糖: {
    substitute: 'はちみつ',
    amount: '大さじ2',
  },
  パルミジャーノチーズ: {
    substitute: '粉チーズ',
    amount: '大さじ2',
  },
  ベーコン: {
    substitute: 'ハム',
    amount: '100g',
  },
  合いびき肉: {
    substitute: '鶏ひき肉',
    amount: '200g',
  },
  チョコレート: {
    substitute: 'ココアパウダー + 砂糖 + バター',
    amount: 'ココア大さじ3 + 砂糖大さじ2 + バター大さじ2',
  },
  エビ: {
    substitute: '鶏むね肉',
    amount: '150g',
  },
  豆板醤: {
    substitute: '味噌 + 一味唐辛子',
    amount: '味噌小さじ1 + 一味唐辛子少々',
  },
  モッツァレラチーズ: {
    substitute: 'ピザ用チーズ',
    amount: '100g',
  },
  ガラムマサラ: {
    substitute: 'カレー粉',
    amount: '小さじ1',
  },
};
