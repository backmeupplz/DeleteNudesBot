# [@DeleteNudesBot](https://t.me/DeleteNudesBot) code

Just add [@DeleteNudesBot](https://t.me/DeleteNudesBot) to a group, give it rights to delete messages and you are done. No more fear of your group being banned for explicit content. Updates channel and support: [@borodutch_support](https://t.me/borodutch_support).

# Installation and local launch

1. Clone this repo: `git clone https://github.com/backmeupplz/DeleteNudesBot`
2. Create `.env` with the environment variables listed below
3. Run `yarn` in the root folder
4. Run `yarn develop`

And you should be good to go! Feel free to fork and submit pull requests. Thanks!

# Environment variables

- `TOKEN` — Telegram bot token
- `MODEL_PATH` — _Optional_ path to the NSFW model files that you can download [here](https://github.com/gantman/nsfw_model)

Also, please, consider looking at `.env.sample`.

# Continuous integration

Any commit pushed to `main` gets deployed to [@DeleteNudesBot](https://t.me/DeleteNudesBot) via [CI Ninja](https://github.com/backmeupplz/ci-ninja).

# License

MIT — use for any purpose. Would be great if you could leave a note about the original developers. Thanks!
