document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataUrl = e.target.result;
        document.body.style.backgroundImage = `url(${imageDataUrl})`;
        localStorage.setItem("backgroundImage", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  });

// Load background image from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const savedBackgroundImage = localStorage.getItem("backgroundImage");
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = `url(${savedBackgroundImage})`;
    document.getElementById(
      "imgg"
    ).style.backgroundImage = `url(${savedBackgroundImage})`;
  }

  const savedName = localStorage.getItem("userName");
  if (savedName) {
    document.getElementById("nameInput").value = savedName;
  }
});

// Quotes array
const quotes = [
  {
    text: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
  {
    text: "Don’t be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
  },
  {
    text: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "The successful warrior is the average man, with laser-like focus.",
    author: "Bruce Lee",
  },
  {
    text: "Keep your eyes on the stars, and your feet on the ground.",
    author: "Theodore Roosevelt",
  },
  {
    text: "You can't cross the sea merely by standing and staring at the water.",
    author: "Rabindranath Tagore",
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
  },
  {
    text: "The only place where success comes before work is in the dictionary.",
    author: "Vidal Sassoon",
  },
  {
    text: "The harder the conflict, the greater the triumph.",
    author: "George Washington",
  },
  {
    text: "To be successful, you must accept all challenges that come your way. You can't just accept the ones you like.",
    author: "Mike Gafka",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "If you are not willing to risk the usual, you will have to settle for the ordinary.",
    author: "Jim Rohn",
  },
  {
    text: "People who are crazy enough to think they can change the world, are the ones who do.",
    author: "Rob Siltanen",
  },
  {
    text: "Do not wait to strike till the iron is hot; but make it hot by striking.",
    author: "William Butler Yeats",
  },
  {
    text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  { text: "An unexamined life is not worth living.", author: "Socrates" },
  { text: "Eighty percent of success is showing up.", author: "Woody Allen" },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "Winning isn’t everything, but wanting to win is.",
    author: "Vince Lombardi",
  },
  {
    text: "I am not a product of my circumstances. I am a product of my decisions.",
    author: "Stephen R. Covey",
  },
  {
    text: "Every child is an artist. The problem is how to remain an artist once he grows up.",
    author: "Pablo Picasso",
  },
  {
    text: "You can never cross the ocean until you have the courage to lose sight of the shore.",
    author: "Christopher Columbus",
  },
  {
    text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou",
  },
  { text: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
  {
    text: "Whether you think you can or you think you can’t, you’re right.",
    author: "Henry Ford",
  },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
  {
    text: "Life shrinks or expands in proportion to one's courage.",
    author: "Anais Nin",
  },
  {
    text: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    author: "Henry David Thoreau",
  },
  {
    text: "Believe you can and you’re halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Everything you’ve ever wanted is on the other side of fear.",
    author: "George Addair",
  },
  {
    text: "Teach thy tongue to say, “I do not know,” and thou shalt progress.",
    author: "Maimonides",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  { text: "Fall seven times and stand up eight.", author: "Japanese Proverb" },
  {
    text: "Happiness is not something readymade. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    text: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    text: "You can’t use up creativity. The more you use, the more you have.",
    author: "Maya Angelou",
  },
  {
    text: "The best way to predict your future is to create it.",
    author: "Abraham Lincoln",
  },
  {
    text: "Your time is limited, don’t waste it living someone else’s life.",
    author: "Steve Jobs",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  { text: "If you can dream it, you can achieve it.", author: "Zig Ziglar" },
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.querySelector("#quoteText i").textContent = randomQuote.text;
  document.getElementById("quoteAuthor").textContent = `-${randomQuote.author}`;
}

// Display a random quote on page load
displayRandomQuote();

// Save name to localStorage
document.getElementById("nameInput").addEventListener("input", function () {
  localStorage.setItem("userName", this.value);
});

const input = document.getElementById("nameInput");
const textWidthMeasurer = document.getElementById("textWidthMeasurer");

function adjustInputWidth() {
  textWidthMeasurer.textContent = input.value || input.placeholder;
  const newWidth = textWidthMeasurer.offsetWidth + 10; // Add some padding
  input.style.width = `${newWidth}px`;
}

input.addEventListener("input", adjustInputWidth);

// Initial adjustment
adjustInputWidth();
