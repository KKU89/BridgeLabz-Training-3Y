# =========================
# ASSIGNMENT 5 - SETUP
# =========================

$folders = 1..10

foreach ($q in $folders) {
    New-Item -ItemType Directory -Force "Q$q" | Out-Null
}

# =========================
# Q1 - Portfolio
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KK Portfolio</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>Krishnakant Upmanyu</h1>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
    </nav>
</header>

<main>
    <section id="home" class="hero">
        <div>
            <h2>Web Developer & Cybersecurity Student</h2>
            <p>I am a B.Tech CSE student interested in web development, cybersecurity and building practical projects.</p>
        </div>
        <img src="https://picsum.photos/300/300" alt="Profile Image">
    </section>

    <section id="about">
        <h2>About Me</h2>
        <p>I enjoy creating clean, responsive websites and learning modern technologies.</p>
    </section>

    <section id="contact">
        <h2>Contact</h2>
        <p>Email: krishnakant@example.com</p>
    </section>
</main>

<footer>© 2026 Krishnakant Upmanyu</footer>

</body>
</html>
'@ | Set-Content "Q1\index.html"

@'
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #0f172a;
    color: #f8fafc;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 70px;
    padding: 1rem 5%;
    background: #111827;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
}

header h1 {
    font-size: 1.4rem;
}

nav a {
    color: white;
    text-decoration: none;
    margin-left: 24px;
}

main {
    flex: 1;
    padding-top: 70px;
}

.hero {
    min-height: 70vh;
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 30px;
}

.hero div {
    max-width: 50%;
}

.hero h2 {
    font-size: 2.5rem;
}

.hero p {
    font-size: 1.15rem;
    line-height: 1.7;
}

.hero img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid #38bdf8;
}

#about,
#contact {
    width: 90%;
    margin: 2rem auto;
    padding: 3rem 5%;
    background: #1e293b;
    border-radius: 15px;
}

footer {
    padding: 1.2rem;
    text-align: center;
    background: #020617;
}

@media (max-width: 700px) {
    header {
        flex-direction: column;
    }

    .hero {
        flex-direction: column;
        text-align: center;
    }

    .hero div {
        max-width: 100%;
    }
}
'@ | Set-Content "Q1\style.css"


# =========================
# Q2 - Informational Page
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Discover Jaipur</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>Discover Jaipur</h1>
    <nav>
        <a href="#history">History</a>
        <a href="#places">Places</a>
        <a href="#culture">Culture</a>
    </nav>
</header>

<main>

<section id="history" class="parallax history">
    <h2>History</h2>
    <p>Jaipur, the Pink City, was founded in 1727 and is famous for its planned streets, forts and royal heritage.</p>
</section>

<section id="places" class="gradient">
    <h2>Famous Places</h2>
    <p>Amber Fort, City Palace and Hawa Mahal are among Jaipur's most famous attractions.</p>
</section>

<section id="culture" class="parallax culture">
    <h2>Culture</h2>
    <p>Rajasthan's colorful clothing, folk music, crafts and cuisine make Jaipur culturally distinctive.</p>
</section>

<section class="radial">
    <h2>Travel Tip</h2>
    <p>Explore the old city early in the morning for comfortable weather and fewer crowds.</p>
</section>

</main>

<footer>© 2026 Discover Jaipur</footer>

</body>
</html>
'@ | Set-Content "Q2\index.html"

@'
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Georgia, serif;
    background: #f5efe6;
    color: #241b15;
}

header {
    padding: 25px 8%;
    background: #5b1f1f;
    color: white;
}

header h1 {
    font-size: 2.2rem;
}

nav a {
    color: white;
    margin-right: 25px;
    text-decoration: none;
}

section {
    min-height: 70vh;
    padding: 12vh 10%;
    border-bottom: 5px solid white;
}

section h2 {
    font-size: 3rem;
    font-weight: 800;
}

section p {
    max-width: 750px;
    font-size: 1.25rem;
    line-height: 1.8;
}

.parallax {
    background-image: url("https://picsum.photos/1600/900?random=10");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: white;
    text-shadow: 0 2px 5px black;
}

.gradient {
    background: linear-gradient(135deg, #f7b267, #d95d39, #7a284b);
    color: white;
}

.radial {
    background: radial-gradient(circle at center, #ffe29a, #f08a5d, #b83b5e);
}

footer {
    padding: 25px;
    text-align: center;
    background: #241b15;
    color: white;
}
'@ | Set-Content "Q2\style.css"


# =========================
# Q3 - Team Members
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Team Members</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="team">

<h1>Our Team</h1>

<div class="team-grid">

<article class="card lead">
    <img src="https://i.pravatar.cc/200?img=12" alt="Team Lead">
    <h2>Krishnakant</h2>
    <h3>Team Lead</h3>
    <p>Coordinates the team and handles project planning and development.</p>
</article>

<article class="card">
    <img src="https://i.pravatar.cc/200?img=32" alt="Developer">
    <h2>Rahul</h2>
    <h3>Developer</h3>
    <p>Builds application features and maintains clean reusable code.</p>
</article>

<article class="card">
    <img src="https://i.pravatar.cc/200?img=47" alt="Designer">
    <h2>Ananya</h2>
    <h3>UI Designer</h3>
    <p>Creates attractive interfaces and focuses on user experience.</p>
</article>

</div>

</main>

</body>
</html>
'@ | Set-Content "Q3\index.html"

@'
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #eef2ff;
}

.team {
    width: 90%;
    max-width: 1100px;
    margin: 50px auto;
}

.team > h1 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2.5rem;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.card {
    padding: 25px;
    margin: 5px;
    border: 2px solid #cbd5e1;
    border-radius: 18px;
    box-shadow: 0 10px 25px rgba(15, 23, 42, .12);
    background: white;
    text-align: center;
    min-height: 360px;
}

.card img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
}

.card h3 {
    color: #4f46e5;
}

.card p {
    line-height: 1.6;
    color: #475569;
}

.lead {
    background: #e0e7ff;
    border: 3px dashed #4f46e5;
}

@media (max-width: 600px) {
    .team-grid {
        grid-template-columns: 1fr;
    }
}
'@ | Set-Content "Q3\style.css"


# =========================
# Q4 - Article
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Future of Web Development</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>The Future of Web Development</h1>
    <p>By Krishnakant Upmanyu | August 27, 2026</p>
</header>

<main>

<p>Web development is changing rapidly as developers adopt better tools and modern approaches. <mark>Performance</mark> and accessibility are becoming essential parts of every project.</p>

<p>Responsive design allows websites to work across phones, tablets and desktops. Developers must understand flexible layouts rather than designing only for one screen size.</p>

<p>Artificial intelligence is becoming part of everyday development workflows. It can help generate ideas, identify bugs and accelerate repetitive tasks while developers remain responsible for quality.</p>

<blockquote>
Good web design is not only about appearance; it is about usability, accessibility and performance.
</blockquote>

<p>Security is another major concern for modern websites. Strong authentication, safe input handling and secure communication reduce common risks.</p>

<p>The future will favor developers who understand both fundamentals and modern tools. HTML, CSS and JavaScript remain important because frameworks are built on top of these technologies.</p>

</main>

</body>
</html>
'@ | Set-Content "Q4\index.html"

@'
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Georgia, serif;
    background: #f8fafc;
    color: #1e293b;
}

header {
    padding: 60px 10%;
    background: #0f172a;
    color: white;
}

header h1 {
    font-size: 3rem;
}

header p {
    color: #cbd5e1;
}

main {
    max-width: 850px;
    margin: 50px auto;
    padding: 0 25px;
}

main p {
    margin: 0 0 28px;
    line-height: 1.9;
    font-size: 1.1rem;
}

main p::first-letter {
    font-size: 2.8rem;
    font-weight: bold;
    float: left;
    line-height: .8;
    margin-right: 5px;
}

main p::first-line {
    font-weight: bold;
}

mark {
    background: #fde68a;
    padding: 2px 5px;
}

blockquote {
    margin: 35px 0;
    padding: 25px;
    border-left: 6px solid #4f46e5;
    background: #e0e7ff;
    font-style: italic;
    font-size: 1.25rem;
}
'@ | Set-Content "Q4\style.css"


# =========================
# Q5 - Pricing
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pricing Plans</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="pricing">

<h1>Choose Your Plan</h1>

<div class="plans">

<section class="plan">
    <h2>Basic</h2>
    <div class="price">₹299<span>/month</span></div>
    <ul>
        <li>5 Projects</li>
        <li>10 GB Storage</li>
        <li>Email Support</li>
    </ul>
    <a href="#">Choose Basic</a>
</section>

<section class="plan popular">
    <span class="badge">MOST POPULAR</span>
    <h2>Standard</h2>
    <div class="price">₹599<span>/month</span></div>
    <ul>
        <li>20 Projects</li>
        <li>50 GB Storage</li>
        <li>Priority Support</li>
    </ul>
    <a href="#">Choose Standard</a>
</section>

<section class="plan">
    <h2>Premium</h2>
    <div class="price">₹999<span>/month</span></div>
    <ul>
        <li>Unlimited Projects</li>
        <li>200 GB Storage</li>
        <li>24/7 Support</li>
    </ul>
    <a href="#">Choose Premium</a>
</section>

</div>
</main>

</body>
</html>
'@ | Set-Content "Q5\index.html"

@'
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #eef2ff;
    color: #111827;
}

.pricing {
    width: 90%;
    max-width: 1100px;
    margin: 60px auto;
}

.pricing > h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 45px;
}

.plans {
    display: flex;
    gap: 25px;
    align-items: stretch;
}

.plan {
    position: relative;
    flex: 1;
    min-height: 430px;
    padding: 35px 30px;
    background: white;
    border: 2px solid #dbeafe;
    border-radius: 18px;
    box-shadow: 0 10px 25px rgba(15, 23, 42, .12);
    display: flex;
    flex-direction: column;
    transition: transform .3s ease, background-color .3s ease;
}

.plan:hover {
    transform: scale(1.04);
    background: #eff6ff;
}

.plan h2 {
    text-align: center;
    font-size: 1.8rem;
}

.price {
    text-align: center;
    font-size: 2.2rem;
    font-weight: bold;
    margin: 20px 0;
}

.price span {
    font-size: .9rem;
    font-weight: normal;
}

.plan ul {
    line-height: 2;
    flex: 1;
}

.plan a {
    text-align: center;
    padding: 12px;
    background: #2563eb;
    color: white;
    text-decoration: none;
    border-radius: 8px;
}

.popular {
    border: 3px solid #f59e0b;
}

.badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: #f59e0b;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: .75rem;
}

@media (max-width: 700px) {
    .plans {
        flex-direction: column;
    }
}
'@ | Set-Content "Q5\style.css"


# =========================
# Q6 - Gallery
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Photo Gallery</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main>

<h1>Photo Gallery</h1>

<div class="gallery">

<figure>
<img src="https://picsum.photos/600/400?1" alt="Nature">
<figcaption>Nature</figcaption>
</figure>

<figure>
<img src="https://picsum.photos/600/400?2" alt="Mountains">
<figcaption>Mountains</figcaption>
</figure>

<figure>
<img src="https://picsum.photos/600/400?3" alt="City">
<figcaption>City</figcaption>
</figure>

<figure>
<img src="https://picsum.photos/600/400?4" alt="Travel">
<figcaption>Travel</figcaption>
</figure>

<figure>
<img src="https://picsum.photos/600/400?5" alt="Forest">
<figcaption>Forest</figcaption>
</figure>

<figure>
<img src="https://picsum.photos/600/400?6" alt="Beach">
<figcaption>Beach</figcaption>
</figure>

</div>
</main>

</body>
</html>
'@ | Set-Content "Q6\index.html"

@'
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #0f172a;
    color: white;
}

main {
    width: 92%;
    max-width: 1200px;
    margin: 50px auto;
}

h1 {
    text-align: center;
    margin-bottom: 35px;
}

.gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

figure {
    position: relative;
    margin: 0;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0,0,0,.3);
    border: 3px solid white;
}

figure img {
    width: 100%;
    height: 260px;
    display: block;
    object-fit: cover;
    transition: transform .4s ease;
}

figcaption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 18px;
    text-align: center;
    background: rgba(0,0,0,.7);
    opacity: 0;
    transition: opacity .3s ease;
}

figure:hover img {
    transform: scale(1.1);
}

figure:hover figcaption {
    opacity: 1;
}

@media (max-width: 800px) {
    .gallery {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 500px) {
    .gallery {
        grid-template-columns: 1fr;
    }
}
'@ | Set-Content "Q6\style.css"


# =========================
# Q7 - Contact Form
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact Us</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="contact-wrapper">

<form>

<h1>Contact Us</h1>

<label for="name">Name</label>
<input id="name" type="text" placeholder="Enter your name" required>

<label for="email">Email</label>
<input id="email" type="email" placeholder="Enter your email" required>

<label for="subject">Subject</label>
<input id="subject" type="text" placeholder="Enter subject" required>

<label for="message">Message</label>
<textarea id="message" rows="6" placeholder="Write your message" required></textarea>

<button type="submit">Send Message</button>

</form>

</main>

</body>
</html>
'@ | Set-Content "Q7\index.html"

@'
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #0f172a, #312e81);
    color: white;
}

.contact-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
}

form {
    width: 100%;
    max-width: 550px;
    padding: 35px;
    background: rgba(255,255,255,.1);
    border: 1px solid rgba(255,255,255,.25);
    border-radius: 18px;
    box-shadow: 0 15px 35px rgba(0,0,0,.25);
}

form h1 {
    text-align: center;
    margin-bottom: 30px;
}

label {
    display: block;
    margin: 15px 0 7px;
}

input,
textarea {
    width: 100%;
    padding: 13px;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
    background: white;
    color: #111827;
    box-shadow: 0 3px 8px rgba(0,0,0,.12);
}

input:focus,
textarea:focus {
    outline: none;
    border-color: #38bdf8;
}

button {
    width: 100%;
    margin-top: 20px;
    padding: 14px;
    border: none;
    border-radius: 8px;
    background: #38bdf8;
    color: #082f49;
    font-weight: bold;
    cursor: pointer;
}
'@ | Set-Content "Q7\style.css"


# =========================
# Q8 - Dashboard
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CSS Dashboard</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>My Dashboard</h1>
</header>

<div class="layout">

<aside>
    <a href="#">Dashboard</a>
    <a href="#">Profile</a>
    <a href="#">Projects</a>
    <a href="#">Settings</a>
</aside>

<main>

<section class="box">
    <h2>Statistics</h2>
    <p>Projects completed: 24</p>
    <p>Tasks pending: 7</p>
</section>

<section class="box">
    <h2>Recent Activity</h2>
    <p>Website project updated today.</p>
    <p>New task assigned yesterday.</p>
</section>

</main>

</div>

</body>
</html>
'@ | Set-Content "Q8\index.html"

@'
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f1f5f9;
    color: #0f172a;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0 30px;
    background: #1e293b;
    color: white;
    z-index: 5;
    display: flex;
    align-items: center;
}

.layout {
    display: flex;
    padding-top: 70px;
    min-height: 100vh;
}

aside {
    width: 230px;
    min-height: calc(100vh - 70px);
    padding: 25px 15px;
    background: #0f172a;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

aside a {
    color: white;
    text-decoration: none;
    padding: 14px;
    border-radius: 8px;
}

aside a:hover {
    background: #334155;
}

main {
    flex: 1;
    padding: 35px;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
}

.box {
    flex: 1;
    min-width: 280px;
    min-height: 250px;
    padding: 30px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(15,23,42,.12);
}

@media (max-width: 700px) {

    .layout {
        flex-direction: column;
    }

    aside {
        width: 100%;
        min-height: auto;
        flex-direction: row;
        flex-wrap: wrap;
    }

    aside a {
        flex: 1;
        text-align: center;
    }
}
'@ | Set-Content "Q8\style.css"


# =========================
# Q9 - Newspaper
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Daily Tech Magazine</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<main class="newspaper">

<h1>DAILY TECH MAGAZINE</h1>

<h2>Technology and the Modern World</h2>

<img src="https://picsum.photos/300/220?tech" alt="Technology Image">

<p>Technology continues to reshape how people communicate, work and learn. Modern software has made information easier to access while creating new challenges for privacy and security.</p>

<p>Artificial intelligence is becoming a major part of digital products. Developers are using intelligent tools to automate repetitive work and explore new ways of solving problems.</p>

<p>Cloud computing has changed how businesses deploy applications. Instead of maintaining all infrastructure locally, organizations can use scalable online services to handle changing workloads.</p>

<p>Cybersecurity has also become essential as more services move online. Strong passwords, secure authentication and careful software design help reduce security risks.</p>

<p>The next generation of developers will need both technical fundamentals and the ability to adapt. Understanding the web platform remains valuable even as new tools and frameworks appear.</p>

<p>Good technology should solve real problems without creating unnecessary complexity. Usability, reliability, accessibility and security should remain central to every digital product.</p>

</main>

</body>
</html>
'@ | Set-Content "Q9\index.html"

@'
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background: #d6d3d1;
    color: #1c1917;
    font-family: Georgia, serif;
}

.newspaper {
    max-width: 1100px;
    margin: 35px auto;
    padding: 35px;
    background: #fafaf9;
    box-shadow: 0 8px 25px rgba(0,0,0,.15);
}

.newspaper h1 {
    column-span: all;
    text-align: center;
    font-size: 3rem;
    border-bottom: 4px double #1c1917;
    padding-bottom: 15px;
}

.newspaper h2 {
    column-span: all;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 30px;
}

.newspaper p {
    column-count: 3;
    column-gap: 35px;
    text-align: justify;
    font-size: 1rem;
    line-height: 1.65;
}

.newspaper img {
    float: left;
    width: 180px;
    height: 130px;
    object-fit: cover;
    margin: 0 18px 10px 0;
    border: 3px solid #444;
}

@media (max-width: 800px) {

    .newspaper {
        padding: 20px;
    }

    .newspaper p {
        column-count: 2;
    }
}

@media (max-width: 550px) {

    .newspaper p {
        column-count: 1;
    }

    .newspaper h1 {
        font-size: 2rem;
    }
}
'@ | Set-Content "Q9\style.css"


# =========================
# Q10 - Complete Layout
# =========================

@'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Complete CSS Layout</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<header>

<div class="logo">KK Web</div>

<nav>
<a href="#home">Home</a>
<a href="#about">About</a>
<a href="#services">Services</a>
<a href="#contact">Contact</a>
</nav>

</header>

<section id="home" class="hero">

<div class="hero-content">
<h1>Build. Design. Create.</h1>
<p>Modern websites made with HTML and CSS.</p>
</div>

</section>

<section id="about" class="about">

<div>
<h2>About Us</h2>
<p>We create responsive and visually balanced websites using semantic HTML and clean CSS.</p>
</div>

<img src="https://picsum.photos/600/400?web" alt="Web Design">

</section>

<section id="services" class="services">

<h2>Our Services</h2>

<div class="service-row">

<article>
<h3>Web Design</h3>
<p>Clean and modern user interfaces.</p>
</article>

<article>
<h3>Responsive Design</h3>
<p>Layouts that work on every screen.</p>
</article>

<article>
<h3>UI Development</h3>
<p>Semantic and maintainable front-end code.</p>
</article>

</div>

</section>

<section id="contact" class="contact">

<h2>Contact</h2>

<form>

<input type="text" placeholder="Name" required>

<input type="email" placeholder="Email" required>

<textarea rows="5" placeholder="Message" required></textarea>

<button type="submit">Send</button>

</form>

</section>

<footer>
© 2026 KK Web. All rights reserved.
</footer>

<a class="top" href="#home">↑</a>

</body>
</html>
'@ | Set-Content "Q10\index.html"

@'
* {
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    color: #0f172a;
    background: #f8fafc;
}

header {
    position: sticky;
    top: 0;
    z-index: 10;
    height: 70px;
    padding: 0 7%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(15,23,42,.95);
    color: white;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

nav a {
    color: white;
    text-decoration: none;
    margin-left: 20px;
}

.hero {
    position: relative;
    min-height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
        linear-gradient(rgba(15,23,42,.65), rgba(15,23,42,.65)),
        url("https://picsum.photos/1600/900?hero") center/cover;
    color: white;
    text-align: center;
}

.hero-content {
    position: relative;
    padding: 30px;
    border: 2px solid rgba(255,255,255,.4);
    outline: 5px solid rgba(255,255,255,.08);
}

.hero h1 {
    font-size: clamp(2.5rem, 7vw, 5rem);
    margin: 0;
}

.about {
    padding: 90px 8%;
    display: flex;
    gap: 50px;
    align-items: center;
}

.about > div,
.about img {
    flex: 1;
}

.about img {
    width: 100%;
    border-radius: 18px;
    border: 6px solid white;
    box-shadow: 0 12px 25px rgba(0,0,0,.15);
}

.about p {
    line-height: 1.8;
}

.services {
    padding: 90px 8%;
    background: linear-gradient(135deg, #e0f2fe, #ede9fe);
    text-align: center;
}

.service-row {
    display: flex;
    gap: 25px;
}

.service-row article {
    position: relative;
    flex: 1;
    padding: 35px;
    background: rgba(255,255,255,.8);
    border: 2px solid #cbd5e1;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(15,23,42,.1);
}

.contact {
    padding: 90px 8%;
    text-align: center;
}

form {
    max-width: 600px;
    margin: auto;
    display: grid;
    gap: 15px;
}

input,
textarea {
    padding: 14px;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
}

button {
    padding: 14px;
    border: none;
    border-radius: 8px;
    background: #2563eb;
    color: white;
    cursor: pointer;
}

footer {
    padding: 25px;
    text-align: center;
    background: #020617;
    color: white;
}

.top {
    position: fixed;
    right: 25px;
    bottom: 25px;
    width: 45px;
    height: 45px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #2563eb;
    color: white;
    text-decoration: none;
}

@media (max-width: 700px) {

    header {
        height: auto;
        padding: 15px 5%;
        flex-direction: column;
        gap: 10px;
    }

    nav a {
        margin: 0 6px;
        font-size: .9rem;
    }

    .about,
    .service-row {
        flex-direction: column;
    }
}
'@ | Set-Content "Q10\style.css"

Write-Host ""
Write-Host "========================================"
Write-Host " ASSIGNMENT 5 CREATED SUCCESSFULLY!"
Write-Host "========================================"
Write-Host "Q1  -> Portfolio"
Write-Host "Q2  -> Informational Webpage"
Write-Host "Q3  -> Team Members"
Write-Host "Q4  -> Article"
Write-Host "Q5  -> Pricing Table"
Write-Host "Q6  -> Photo Gallery"
Write-Host "Q7  -> Contact Form"
Write-Host "Q8  -> Dashboard"
Write-Host "Q9  -> Newspaper"
Write-Host "Q10 -> Complete CSS Layout"
Write-Host "========================================"