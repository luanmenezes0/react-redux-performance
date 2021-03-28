import { rest } from 'msw';
import { sub } from 'date-fns';

const fakeNames = {
  1: 'Frances B. Bingham',
  2: 'مهری شادین',
  3: 'Raissa Dias Costa',
  4: 'Breno Almeida',
  5: 'Kristine L. Andreasen',
  6: 'Izabella Duda',
  7: 'Vekma Jorn',
  8: 'Constance Wilson',
  9: 'Валентин Харито́нов',
  10: 'Amerigo Calabresi',
};

export const handlers = [
  rest.get(`https://jsonplaceholder.typicode.com/posts`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req);
    const originalResponseData = await originalResponse.json();

    const randomMinutesAgo = () => Math.floor(Math.random() * 50);

    const sliced = originalResponseData.slice(0, 51);

    const posts = sliced.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.body,
      user: { name: fakeNames[post.userId], id: post.userId },
      date: sub(new Date(), { minutes: randomMinutesAgo() }).toISOString(),
      reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    }));

    return res(ctx.json(posts));
  }),
];
