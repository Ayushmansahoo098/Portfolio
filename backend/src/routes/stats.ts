import { Router } from 'express';

export const statsRouter = Router();

statsRouter.get('/', async (_req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/Ayushmansahoo098');
    if (!response.ok) {
      throw new Error(`GitHub API HTTP ${response.status}`);
    }
    const data = await response.json();
    
    return res.json({
      success: true,
      data: {
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        bio: data.bio,
        location: data.location,
        avatarUrl: data.avatar_url,
      },
    });
  } catch (err) {
    return res.json({
      success: false,
      fallback: true,
      data: {
        publicRepos: 18,
        followers: 12,
        following: 15,
        status: 'Active Builder',
      },
    });
  }
});
