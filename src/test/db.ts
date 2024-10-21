import { factory, primaryKey } from '@mswjs/data';

// Define the models for users and posts
export const mockDb = factory({
  user: {
    id: primaryKey(Number),
    name: String,
    username: String,
    email: String,
    phone: String,
    website: String,
  },
  post: {
    id: primaryKey(Number),
    title: String,
    body: String,
    userId: Number,
    date: String,
    reactions: {
      thumbsUp: Number,
      wow: Number,
      heart: Number,
      rocket: Number,
      coffee: Number,
    },
  },
});

// Helper function to save posts and users to localStorage
export const saveToLocalStorage = () => {
  if (process.env.NODE_ENV === 'test') return;

  const users = mockDb.user.getAll();
  const posts = mockDb.post.getAll();

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('posts', JSON.stringify(posts));
};

// Helper function to load data from localStorage if available
export const loadFromLocalStorage = () => {
  const usersData = localStorage.getItem('users');
  const postsData = localStorage.getItem('posts');

  if (usersData) {
    const users = JSON.parse(usersData);
    // eslint-disable-next-line unicorn/no-array-for-each
    users.forEach((user: any) => mockDb.user.create(user));
  }

  if (postsData) {
    const posts = JSON.parse(postsData);
    // eslint-disable-next-line unicorn/no-array-for-each
    posts.forEach((post: any) => mockDb.post.create(post));
  }
};

// Seed the initial users and posts
export const seedDatabase = () => {
  const hasSavedData =
    localStorage.getItem('users') || localStorage.getItem('posts');

  if (hasSavedData) {
    loadFromLocalStorage();
  } else {
    // Default seed data if nothing is stored in localStorage
    mockDb.user.create({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
    });

    mockDb.user.create({
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
    });

    mockDb.post.create({
      id: 1,
      title: 'qui est esse',
      body: 'hey there',
      userId: 1,
      date: '2022-04-13T23:02:19.248Z',
      reactions: {
        thumbsUp: 5,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    });

    mockDb.post.create({
      id: 2,
      title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      body: 'hey there!',
      userId: 1,
      date: '2022-05-02T20:41:05.437Z',
      reactions: {
        thumbsUp: 5,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    });

    mockDb.post.create({
      id: 3,
      title: 'nesciunt quas odio',
      body: 'Hello there!',
      userId: 1,
      date: '2022-04-14T17:46:43.450Z',
      reactions: {
        thumbsUp: 5,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    });

    mockDb.post.create({
      id: 4,
      title: 'dolorem eum magni eos aperiam quia',
      body: 'Hi',
      userId: 1,
      date: '2022-04-14T17:58:28.955Z',
      reactions: {
        thumbsUp: 5,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    });

    mockDb.post.create({
      id: 5,
      title: 'dolorum ut in voluptas mollitia et saepe quo animi',
      body: 'aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam',
      userId: 2,
      date: '2022-04-14T17:58:28.955Z',
      reactions: {
        thumbsUp: 5,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    });

    // Save the seeded data to localStorage
    saveToLocalStorage();
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem('users');
  localStorage.removeItem('posts');
};

export const clearDatabase = () => {
  mockDb.user.deleteMany({
    where: {
      id: {
        gt: 0,
      },
    },
  });

  mockDb.post.deleteMany({
    where: {
      id: {
        gt: 0, // This will delete all posts with an ID greater than 0
      },
    },
  });

  clearLocalStorage();
};

export const reloadDatabase = () => {
  clearDatabase();
  seedDatabase(); // Reseed database with default data or load from localStorage
};
