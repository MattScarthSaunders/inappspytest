# in-app browser detection

This repo exists only to test in-app browser redirects on mobile, using the class found in scripts/main.js, which is a clone of an actual class in use.

To test:

- Go to instagram app on your phone.
- Send yourself a message consisting of this link: [mattscarthsaunders.github.io](mattscarthsaunders.github.io)
- Click the link.
- instagram will open (essentially) index.html and prompt you for a redirect confirmation.

You should see yourself redirected to [nodescript.dev/signup](nodescript.dev/signup), and there should be a utm query parameter in the url.
