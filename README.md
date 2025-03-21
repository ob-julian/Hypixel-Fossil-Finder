```
 _  _           _         _   ___       _ _       ___ _         _         
| || |_  _ _ __(_)_ _____| | | __|__ __(_) |___  | __(_)_ _  __| |___ _ _ 
| __ | || | '_ \ \ \ / -_) | | _/ _ (_-< | / -_) | _|| | ' \/ _` / -_) '_|
|_||_|\_, | .__/_/_\_\___|_| |_|\___/__/_|_\___| |_| |_|_||_\__,_\___|_|  
      |__/|_|                                                             
```
#

`Hypixel Fossil Finder` is a web application built with Angular that helps users find fossils from suspicious scrap in the Hypixel Skyblock game.


## Why?

In short, I didn't want to install another mod for this activity I do like once a month. Furthermore, a mod that does only this one thing probably doesn't exist and I would need to sift through a bunch of other features I don't need. 

So, I did what any sane person would do: spend hours upon hours building a web application that does the same thing. Because, you know, why take the easy route when you can over-engineer a solution for a problem you barely encounter?

Also, let's be honest, I probably spent more time building this app than I will ever spend using it. But hey, it was a great excuse to dive into the new Angular standalone components. And who doesn't love the satisfaction of creating something from scratch, even if it's for a niche use case that only a handful of people might appreciate?

In the end, it was a fun project, a great learning experience, and a perfect way to procrastinate from all the other important things I should have been doing. So, if you're like me and enjoy making your life unnecessarily complicated, welcome aboard!

With that said, I hope you enjoy the app and find it useful. If you have any feedback, suggestions, or just want to say hi, feel free to reach out. I'd love to hear from you!


## What?

This application consists of two main components:
- **Fossil Finder**: A tool that assists users in locating fossils from suspicious scrap by inputting the current excavation state and providing a list of potential fossils and the best follow-up actions.
- **Fossil Archive**: A collection of all known fossils (to me). If you find any errors or discover a new fossil, feel free to let me know. In the meantime, you can add, edit, or delete fossils here. This page was primarily created for my use, as all fossils need to be manually added, and I wanted an efficient way to manage them. However, you might find it useful too!

## Dev Section:

### Installation

To install the project, clone the repository and install the dependencies:

```sh
git clone https://github.com/ob-julian/hypixel-fossil-finder.git
cd hypixel-fossil-finder
npm install
```

### Usage

To start the development server, run:

```sh
npm start
```

Navigate to `http://localhost:4200/` to view the application.

### Build

To build the project, run:

```sh
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Server Configuration

Because the application is a SPA without a server-side component, I would highly recommend configuring your server to redirect all requests to the `index.html` file. This is necessary for the Angular routing to work correctly, otherwise, you will encounter 404 errors when refreshing the page or navigating directly to a URL.

For example, if you are using Apache, you can add the following configuration to your `.htaccess` file:

```apache
<IfModule mod_rewrite.c> 
  <Directory /var/www/html/hff>
    RewriteEngine On
    RewriteBase /hff/
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ /hff/index.html [QSA,L]
  </Directory>
</IfModule>
```
> The IfModule is optional, but it's a good practice to include it to prevent errors if the module is not enabled.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more information.