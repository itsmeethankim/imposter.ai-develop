import { Category } from '../App';

// Free built-in categories (basics only)
export const BUILT_IN_CATEGORIES: Category[] = [
  {
    id: 'animals',
    name: 'Animals',
    emoji: '🐾',
    isPremium: false,
    words: [
      'Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Giraffe', 'Zebra', 'Penguin', 'Kangaroo',
      'Dolphin', 'Eagle', 'Snake', 'Rabbit', 'Fox', 'Wolf', 'Panda', 'Koala', 'Hippo', 'Crocodile',
      'Cheetah', 'Leopard', 'Jaguar', 'Panther', 'Hyena', 'Rhino', 'Buffalo', 'Moose', 'Deer', 'Elk',
      'Antelope', 'Gazelle', 'Gnu', 'Wildebeest', 'Impala', 'Kudu', 'Oryx', 'Eland', 'Springbok', 'Gemsbok',
      'Gorilla', 'Chimpanzee', 'Orangutan', 'Baboon', 'Monkey', 'Lemur', 'Gibbon', 'Macaque', 'Mandrill', 'Tamarin',
      'Whale', 'Shark', 'Orca', 'Seal', 'Walrus', 'Sea Lion', 'Manatee', 'Dugong', 'Narwhal', 'Beluga',
      'Octopus', 'Squid', 'Jellyfish', 'Starfish', 'Crab', 'Lobster', 'Shrimp', 'Clam', 'Oyster', 'Mussel',
      'Parrot', 'Macaw', 'Cockatoo', 'Parakeet', 'Budgie', 'Canary', 'Finch', 'Sparrow', 'Robin', 'Cardinal',
      'Blue Jay', 'Crow', 'Raven', 'Magpie', 'Hawk', 'Falcon', 'Vulture', 'Condor', 'Owl', 'Hummingbird',
      'Flamingo', 'Pelican', 'Stork', 'Heron', 'Crane', 'Ibis', 'Spoonbill', 'Egret', 'Swan', 'Goose',
      'Duck', 'Mallard', 'Teal', 'Loon', 'Grebe', 'Cormorant', 'Albatross', 'Seagull', 'Puffin', 'Tern',
      'Alligator', 'Caiman', 'Gharial', 'Komodo Dragon', 'Iguana', 'Chameleon', 'Gecko', 'Lizard', 'Skink', 'Anole',
      'Turtle', 'Tortoise', 'Terrapin', 'Sea Turtle', 'Snapping Turtle', 'Box Turtle', 'Painted Turtle', 'Slider', 'Cooter', 'Softshell',
      'Python', 'Boa', 'Anaconda', 'Cobra', 'Viper', 'Rattlesnake', 'Mamba', 'Adder', 'Asp', 'Taipan',
      'Frog', 'Toad', 'Tree Frog', 'Poison Dart Frog', 'Bullfrog', 'Tadpole', 'Salamander', 'Newt', 'Axolotl', 'Caecilian',
      'Butterfly', 'Moth', 'Dragonfly', 'Damselfly', 'Beetle', 'Ladybug', 'Firefly', 'Cricket', 'Grasshopper', 'Locust',
      'Bee', 'Wasp', 'Hornet', 'Ant', 'Termite', 'Fly', 'Mosquito', 'Gnat', 'Cicada', 'Mantis',
      'Spider', 'Tarantula', 'Scorpion', 'Centipede', 'Millipede', 'Tick', 'Mite', 'Flea', 'Louse', 'Bedbug',
      'Hamster', 'Gerbil', 'Guinea Pig', 'Chinchilla', 'Ferret', 'Hedgehog', 'Mouse', 'Rat', 'Squirrel', 'Chipmunk',
      'Beaver', 'Otter', 'Mink', 'Weasel', 'Badger', 'Wolverine', 'Marten', 'Skunk', 'Raccoon', 'Opossum',
      'Armadillo', 'Anteater', 'Sloth', 'Capybara', 'Porcupine', 'Aardvark', 'Meerkat', 'Prairie Dog', 'Groundhog', 'Mole',
      'Bat', 'Flying Fox', 'Vampire Bat', 'Fruit Bat', 'Horse', 'Pony', 'Donkey', 'Mule', 'Zebra Horse', 'Unicorn',
      'Cow', 'Bull', 'Ox', 'Bison', 'Yak', 'Water Buffalo', 'Pig', 'Boar', 'Sheep', 'Ram',
      'Goat', 'Llama', 'Alpaca', 'Camel', 'Dromedary', 'Chicken', 'Rooster', 'Hen', 'Turkey', 'Peacock',
      'Ostrich', 'Emu', 'Cassowary', 'Kiwi', 'Roadrunner', 'Quail', 'Pheasant', 'Grouse', 'Ptarmigan', 'Guinea Fowl',
      'Salmon', 'Trout', 'Bass', 'Pike', 'Perch', 'Catfish', 'Carp', 'Goldfish', 'Koi', 'Betta',
      'Tuna', 'Swordfish', 'Marlin', 'Sailfish', 'Barracuda', 'Mahi Mahi', 'Grouper', 'Snapper', 'Flounder', 'Halibut',
      'Cod', 'Haddock', 'Pollock', 'Tilapia', 'Sardine', 'Anchovy', 'Herring', 'Mackerel', 'Eel', 'Moray Eel',
      'Stingray', 'Manta Ray', 'Sawfish', 'Hammerhead', 'Great White', 'Tiger Shark', 'Bull Shark', 'Reef Shark', 'Nurse Shark', 'Whale Shark',
      'Clownfish', 'Angelfish', 'Butterflyfish', 'Parrotfish', 'Surgeonfish', 'Tang', 'Triggerfish', 'Pufferfish', 'Boxfish', 'Lionfish',
      'Seahorse', 'Pipefish', 'Sea Dragon', 'Anemone', 'Coral', 'Sponge', 'Sea Urchin', 'Sand Dollar', 'Sea Cucumber', 'Nautilus',
      'Grizzly', 'Polar Bear', 'Black Bear', 'Sun Bear', 'Sloth Bear', 'Spectacled Bear', 'Giant Panda', 'Red Panda', 'Binturong', 'Civet',
      'Mongoose', 'Honey Badger', 'Tasmanian Devil', 'Quokka', 'Wallaby', 'Wombat', 'Dingo', 'Platypus', 'Echidna', 'Numbat',
      'Kookaburra', 'Lyrebird', 'Lorikeet', 'Cockatiel', 'Galah', 'Toucan', 'Woodpecker', 'Kingfisher'
    ]
  },
  {
    id: 'foods',
    name: 'Food',
    emoji: '🍣',
    isPremium: false,
    words: [
      'Pizza', 'Burger', 'Sushi', 'Tacos', 'Pasta', 'Steak', 'Ramen', 'Ice Cream', 'Chocolate', 'Salad',
      'Sandwich', 'Fried Chicken', 'Curry', 'Dumplings', 'Pancakes', 'Waffles', 'Nachos', 'Hot Dog', 'Spaghetti', 'Burrito',
      'Quesadilla', 'Enchilada', 'Fajita', 'Tostada', 'Chimichanga', 'Tamale', 'Empanada', 'Lasagna', 'Ravioli', 'Fettuccine',
      'Penne', 'Rigatoni', 'Carbonara', 'Alfredo', 'Marinara', 'Bolognese', 'Pesto', 'Macaroni and Cheese', 'Cheeseburger', 'Bacon Cheeseburger',
      'Big Mac', 'Whopper', 'French Fries', 'Onion Rings', 'Mozzarella Sticks', 'Chicken Nuggets', 'Chicken Tenders', 'Buffalo Wings', 'BBQ Wings', 'Hot Wings',
      'Caesar Salad', 'Greek Salad', 'Cobb Salad', 'California Roll', 'Spicy Tuna Roll', 'Salmon Roll', 'Dragon Roll', 'Rainbow Roll', 'Gyoza', 'Takoyaki',
      'Pho', 'Pad Thai', 'Tom Yum', 'Green Curry', 'Red Curry', 'Fried Rice', 'Lo Mein', 'Chow Mein', 'General Tso Chicken', 'Orange Chicken',
      'Kung Pao Chicken', 'Sesame Chicken', 'Mongolian Beef', 'Beef and Broccoli', 'Spring Rolls', 'Egg Rolls', 'Pot Stickers', 'Wontons', 'Clam Chowder', 'Tomato Soup',
      'Chicken Noodle Soup', 'Minestrone', 'French Onion Soup', 'Miso Soup', 'Gumbo', 'Jambalaya', 'Fish and Chips', 'Fish Tacos', 'Ceviche', 'Paella',
      'Risotto', 'Gnocchi', 'Meatballs', 'Philly Cheesesteak', 'Reuben Sandwich', 'Club Sandwich', 'BLT', 'Grilled Cheese', 'Tuna Melt', 'Lobster Roll',
      'Crab Cake', 'Shrimp Cocktail', 'Shrimp Scampi', 'Calamari', 'Oysters', 'Mussels', 'Bagel', 'Croissant', 'Donut', 'Cinnamon Roll',
      'Muffin', 'Scone', 'Churro', 'Funnel Cake', 'Crepe', 'French Toast', 'Eggs Benedict', 'Omelette', 'Scrambled Eggs', 'Bacon',
      'Sausage', 'Hash Browns', 'Tater Tots', 'Pork Chop', 'Baby Back Ribs', 'Pulled Pork', 'Brisket', 'T-Bone Steak', 'Ribeye', 'Filet Mignon',
      'Pot Roast', 'Beef Stew', 'Shepherd\'s Pie', 'Meatloaf', 'Gyro', 'Shawarma', 'Kebab', 'Falafel', 'Hummus', 'Baklava',
      'Tiramisu', 'Cheesecake', 'Red Velvet Cake', 'Carrot Cake', 'Chocolate Cake', 'Ice Cream Cake', 'Cupcake', 'Brownie', 'Cookie', 'Chocolate Chip Cookie',
      'Apple Pie', 'Cherry Pie', 'Pumpkin Pie', 'Pecan Pie', 'Key Lime Pie', 'Banana Split', 'Milkshake', 'Smoothie', 'Popsicle', 'Cotton Candy'
    ]
  },
  {
    id: 'brands',
    name: 'Brands',
    emoji: '👟',
    isPremium: false,
    words: [
      'Apple', 'Samsung', 'Google', 'Microsoft', 'Amazon', 'Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour',
      'McDonald\'s', 'Burger King', 'Wendy\'s', 'KFC', 'Subway', 'Taco Bell', 'Chipotle', 'Starbucks', 'Dunkin', 'Krispy Kreme',
      'Coca Cola', 'Pepsi', 'Sprite', 'Fanta', 'Red Bull', 'Monster Energy', 'Gatorade', 'Powerade', 'Dr Pepper', 'Mountain Dew',
      'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Tesla', 'Volkswagen', 'Nissan',
      'Ferrari', 'Lamborghini', 'Porsche', 'Mazda', 'Hyundai', 'Kia', 'Subaru', 'Jeep', 'Dodge', 'Ram',
      'Target', 'Walmart', 'Costco', 'IKEA', 'Home Depot', 'Lowe\'s', 'Best Buy', 'GameStop', 'CVS', 'Walgreens',
      'Gucci', 'Louis Vuitton', 'Chanel', 'Prada', 'Versace', 'Burberry', 'Hermes', 'Dior', 'Balenciaga', 'Givenchy',
      'Rolex', 'Omega', 'Tag Heuer', 'Cartier', 'Patek Philippe', 'Fossil', 'Casio', 'Seiko', 'Timex', 'Swatch',
      'Sony', 'Nintendo', 'PlayStation', 'Xbox', 'Logitech', 'Razer', 'Alienware', 'ASUS', 'Dell', 'HP',
      'Lenovo', 'Acer', 'Canon', 'Nikon', 'GoPro', 'DJI', 'Bose', 'JBL', 'Beats', 'Sennheiser',
      'Netflix', 'Disney', 'HBO', 'Hulu', 'Spotify', 'YouTube', 'TikTok', 'Instagram', 'Facebook', 'Twitter',
      'Snapchat', 'WhatsApp', 'Telegram', 'Discord', 'Twitch', 'Reddit', 'LinkedIn', 'Pinterest', 'Uber', 'Lyft',
      'Airbnb', 'DoorDash', 'Grubhub', 'Postmates', 'Venmo', 'PayPal', 'Zelle', 'Cash App', 'Visa', 'Mastercard',
      'American Express', 'Discover', 'Chase', 'Bank of America', 'Wells Fargo', 'Capital One', 'Lego', 'Mattel', 'Hasbro', 'Barbie',
      'Hot Wheels', 'Nerf', 'Play Doh', 'Fisher Price', 'L\'Oreal', 'Maybelline', 'MAC', 'Sephora', 'Ulta', 'Fenty Beauty',
      'Old Spice', 'Axe', 'Dove', 'Nivea', 'Vaseline', 'Johnson & Johnson', 'Band Aid', 'Kleenex', 'Tide', 'Gain',
      'Downy', 'Febreze', 'Clorox', 'Lysol', 'Windex', 'Swiffer', 'Mr Clean', 'Bounty', 'Charmin', 'Cottonelle',
      'Pampers', 'Huggies', 'Gerber', 'Similac', 'Enfamil', 'Tylenol', 'Advil', 'Aleve', 'Bayer', 'Nyquil',
      'Vicks', 'Listerine', 'Colgate', 'Crest', 'Oral B', 'Gillette', 'Schick', 'Degree', 'Secret', 'Head & Shoulders'
    ]
  }
];

// Premium categories (locked behind subscription)
export const PREMIUM_CATEGORIES: Category[] = [
  {
    id: 'movies',
    name: 'Hollywood',
    emoji: '🎬',
    isPremium: true,
    words: [
      'The Shawshank Redemption', 'The Godfather', 'Inception', 'The Dark Knight', 'Pulp Fiction', 'Forrest Gump', 'The Matrix', 'Interstellar', 'Parasite', 'Avengers Endgame',
      'Titanic', 'Star Wars', 'Jurassic Park', 'Avatar', 'Spider-Man', 'The Lord of the Rings', 'Harry Potter', 'Toy Story', 'Finding Nemo', 'The Lion King',
      'Schindler\'s List', 'Fight Club', 'Goodfellas', 'The Silence of the Lambs', 'Saving Private Ryan', 'The Green Mile', 'Se7en', 'The Usual Suspects', 'The Departed', 'Gladiator',
      'The Prestige', 'Memento', 'The Shining', 'Jaws', 'E.T.', 'Raiders of the Lost Ark', 'Back to the Future', 'Ghostbusters', 'The Terminator', 'Terminator 2',
      'Alien', 'Aliens', 'Predator', 'Die Hard', 'Mad Max Fury Road', 'John Wick', 'Iron Man', 'Captain America', 'Thor', 'The Avengers',
      'Guardians of the Galaxy', 'Doctor Strange', 'Black Panther', 'Spider Man No Way Home', 'Deadpool', 'Logan', 'X Men', 'Batman Begins', 'The Dark Knight Rises', 'Man of Steel',
      'Wonder Woman', 'Aquaman', 'Joker', 'The Batman', 'Fellowship of the Ring', 'Two Towers', 'Return of the King', 'The Hobbit', 'Sorcerer\'s Stone', 'Chamber of Secrets',
      'Prisoner of Azkaban', 'Goblet of Fire', 'A New Hope', 'Empire Strikes Back', 'Return of the Jedi', 'The Force Awakens', 'The Last Jedi', 'Rogue One', 'Toy Story 2', 'Toy Story 3',
      'Monsters Inc', 'The Incredibles', 'Up', 'Wall E', 'Inside Out', 'Coco', 'Frozen', 'Moana', 'Zootopia', 'Encanto'
    ]
  },
  {
    id: 'games',
    name: 'Video Games',
    emoji: '🎮',
    isPremium: true,
    words: [
      'Fortnite', 'Minecraft', 'Roblox', 'Among Us', 'Fall Guys', 'Rocket League', 'Valorant', 'CS:GO', 'Call of Duty', 'Apex Legends',
      'Overwatch', 'League of Legends', 'Dota 2', 'PUBG', 'Rainbow Six Siege', 'Warzone', 'The Last of Us', 'God of War', 'Spider-Man', 'Horizon Zero Dawn',
      'Uncharted', 'Ghost of Tsushima', 'Bloodborne', 'Dark Souls', 'Elden Ring', 'Sekiro', 'The Witcher 3', 'Red Dead Redemption', 'Grand Theft Auto', 'Cyberpunk 2077',
      'Assassin\'s Creed', 'Far Cry', 'Watch Dogs', 'Resident Evil', 'Silent Hill', 'Dead Space', 'The Evil Within', 'Halo', 'Gears of War', 'Forza',
      'Super Mario', 'Zelda', 'Pokemon', 'Mario Kart', 'Smash Bros', 'Animal Crossing', 'Splatoon', 'Metroid', 'Donkey Kong', 'Kirby',
      'Sonic', 'Crash Bandicoot', 'Spyro', 'Tekken', 'Street Fighter', 'Mortal Kombat', 'FIFA', 'Madden', 'NBA 2K', 'MLB The Show',
      'Final Fantasy', 'Kingdom Hearts', 'Dragon Quest', 'Persona', 'Fire Emblem', 'Xenoblade', 'Skyrim', 'Fallout', 'Doom', 'Wolfenstein',
      'Portal', 'Half-Life', 'Team Fortress', 'Left 4 Dead', 'BioShock', 'Dishonored', 'Prey', 'Starcraft', 'Warcraft', 'Diablo',
      'Hearthstone', 'Overcooked', 'Stardew Valley', 'Terraria', 'Hollow Knight', 'Celeste', 'Hades', 'Dead Cells', 'Cuphead', 'Undertale',
      'Deltarune', 'Subnautica', 'No Man\'s Sky', 'Sea of Thieves', 'Destiny', 'The Division', 'Monster Hunter', 'Metal Gear', 'Devil May Cry', 'Bayonetta',
      'Yakuza', 'Shenmue', 'Sonic Adventure', 'Jet Set Radio', 'Crazy Taxi', 'Tony Hawk', 'Skate', 'Need for Speed', 'Burnout', 'Gran Turismo',
      'Hitman', 'Splinter Cell', 'Tomb Raider', 'Batman Arkham', 'Injustice', 'Mortal Kombat X', 'Dragon Ball FighterZ', 'Guilty Gear', 'BlazBlue', 'Marvel vs Capcom',
      'Sims', 'SimCity', 'Cities Skylines', 'Civilization', 'Age of Empires', 'Total War', 'XCOM', 'Mass Effect', 'Dragon Age', 'Star Wars Battlefront',
      'Battlefield', 'Titanfall', 'Star Wars Jedi', 'Lego Star Wars', 'Angry Birds', 'Candy Crush', 'Clash of Clans', 'Clash Royale', 'Brawl Stars', 'Subway Surfers',
      'Temple Run', 'Plants vs Zombies', 'Peggle', 'Bejeweled', 'Tetris', 'Pac-Man', 'Space Invaders', 'Galaga', 'Donkey Kong Country', 'Banjo-Kazooie',
      'Conker', 'Goldeneye', 'Perfect Dark', 'TimeSplitters', 'Medal of Honor', 'Brothers in Arms', 'Borderlands', 'Rage', 'Quake', 'Duke Nukem',
      'Max Payne', 'Alan Wake', 'Control', 'Quantum Break', 'Sunset Overdrive', 'Ratchet and Clank', 'Jak and Daxter', 'Sly Cooper', 'Infamous', 'Prototype',
      'Saints Row', 'Just Cause', 'Sleeping Dogs', 'Mafia', 'L.A. Noire', 'Heavy Rain', 'Detroit Become Human', 'Beyond Two Souls', 'Until Dawn', 'The Quarry',
      'Genshin Impact', 'Honkai Star Rail', 'Tower of Fantasy', 'Ni no Kuni', 'Tales of', 'Star Ocean', 'Trials of Mana', 'Chrono Trigger', 'Chrono Cross', 'Secret of Mana'
    ]
  },
  {
    id: 'artists',
    name: 'Music Artists',
    emoji: '🎤',
    isPremium: true,
    words: [
      'The Beatles', 'Michael Jackson', 'Madonna', 'Elvis Presley', 'Queen', 'David Bowie', 'Prince', 'Nirvana', 'Coldplay', 'Radiohead',
      'Led Zeppelin', 'Pink Floyd', 'The Rolling Stones', 'AC/DC', 'Metallica', 'Guns N Roses', 'Pearl Jam', 'Red Hot Chili Peppers', 'Foo Fighters', 'Green Day',
      'Blink 182', 'Linkin Park', 'System of a Down', 'Bob Dylan', 'Bruce Springsteen', 'Elton John', 'Billy Joel', 'Stevie Wonder', 'Marvin Gaye', 'Ray Charles',
      'Aretha Franklin', 'Whitney Houston', 'Mariah Carey', 'Celine Dion', 'Fleetwood Mac', 'Eagles', 'The Who', 'The Doors', 'U2', 'R.E.M.',
      'The Smiths', 'Depeche Mode', 'The Cure', 'Oasis', 'Blur', 'Arctic Monkeys', 'The Strokes', 'The White Stripes', 'The Black Keys', 'Muse',
      'Gorillaz', 'Paramore', 'No Doubt', 'Gwen Stefani', 'Avril Lavigne', 'OutKast', 'A Tribe Called Quest', 'Wu Tang Clan', 'Nas', 'Tupac',
      'Destiny\'s Child', 'TLC', 'NSYNC', 'Backstreet Boys', 'One Direction', 'Jonas Brothers', 'BTS Band', 'Blackpink Group', 'Katy Perry Artist', 'Halsey',
      'Dua Lipa Artist', 'Billie Eilish Artist', 'Olivia Rodrigo Artist', 'Travis Scott Artist', 'Future', 'Drake Artist', 'Kanye West Artist', 'Kendrick Lamar Artist', 'J Cole', 'Post Malone Artist'
    ]
  },
  {
    id: 'shows',
    name: 'TV Shows',
    emoji: '📺',
    isPremium: true,
    words: [
      'Breaking Bad', 'Game of Thrones', 'Friends', 'The Office', 'Stranger Things', 'The Crown', 'The Mandalorian', 'Squid Game', 'Wednesday', 'The Last of Us',
      'Succession', 'Better Call Saul', 'The Bear', 'House of the Dragon', 'Yellowstone', 'The Wire', 'The Sopranos', 'Mad Men', 'True Detective', 'Westworld',
      'Black Mirror', 'Ozark', 'Narcos', 'Peaky Blinders', 'Sherlock', 'Doctor Who', 'The Witcher', 'Seinfeld', 'Parks and Recreation', 'Brooklyn Nine Nine',
      'The Good Place', 'Community', 'Scrubs', 'How I Met Your Mother', 'The Big Bang Theory', 'Modern Family', 'The Fresh Prince', 'Lost', 'The Walking Dead', 'Prison Break',
      'Dexter', 'House of Cards', 'Grey\'s Anatomy', 'Gossip Girl', 'Riverdale', 'The Vampire Diaries', 'Rick and Morty', 'BoJack Horseman', 'The Boys', 'Invincible',
      'Avatar The Last Airbender', 'Young Justice', 'WandaVision', 'Loki', 'Hawkeye', 'Moon Knight', 'Bridgerton', 'The Witcher Netflix', 'Cobra Kai', 'Ted Lasso',
      'Severance', 'For All Mankind', 'The Morning Show', 'Reacher', 'Jack Ryan', 'Halo', 'The Last of Us HBO', '1923', 'Mayor of Kingstown', 'Tulsa King'
    ]
  },
  {
    id: 'songs',
    name: 'Popular Songs',
    emoji: '🎵',
    isPremium: true,
    words: [
      'Bohemian Rhapsody - Queen', 'Imagine - John Lennon', 'Smells Like Teen Spirit - Nirvana', 'Hey Jude - The Beatles', 'Billie Jean - Michael Jackson', 'Wonderwall - Oasis', 'Shape of You - Ed Sheeran', 'Blinding Lights - The Weeknd', 'Rolling in the Deep - Adele', 'Someone Like You - Adele',
      'Old Town Road - Lil Nas X', 'Bad Guy - Billie Eilish', 'Uptown Funk - Bruno Mars', 'Happy - Pharrell Williams', 'Despacito - Luis Fonsi', 'Thriller - Michael Jackson', 'Beat It - Michael Jackson', 'Smooth Criminal - Michael Jackson', 'Stairway to Heaven - Led Zeppelin', 'Hotel California - Eagles',
      'Sweet Child O Mine - Guns N Roses', 'November Rain - Guns N Roses', 'Don\'t Stop Believin\' - Journey', 'Livin\' on a Prayer - Bon Jovi', 'Every Breath You Take - The Police', 'Purple Rain - Prince', 'Let It Be - The Beatles', 'Yesterday - The Beatles', 'Come Together - The Beatles', 'Here Comes the Sun - The Beatles',
      'Sweet Home Alabama - Lynyrd Skynyrd', 'Free Bird - Lynyrd Skynyrd', 'Born to Run - Bruce Springsteen', 'Take On Me - A-ha', 'I Wanna Dance with Somebody - Whitney Houston', 'My Heart Will Go On - Celine Dion', 'Killing Me Softly - Fugees', 'Respect - Aretha Franklin', 'What\'s Going On - Marvin Gaye', 'Superstition - Stevie Wonder',
      'Like a Virgin - Madonna', 'Vogue - Madonna', 'Like a Prayer - Madonna', 'Umbrella - Rihanna', 'We Found Love - Rihanna', 'Single Ladies - Beyoncé', 'Crazy in Love - Beyoncé', 'Halo - Beyoncé', 'Stronger - Kanye West', 'Gold Digger - Kanye West',
      'Lose Yourself - Eminem', 'Stan - Eminem', 'In Da Club - 50 Cent', 'God\'s Plan - Drake', 'Hotline Bling - Drake', 'Sicko Mode - Travis Scott', 'Sunflower - Post Malone', 'Rockstar - Post Malone', 'Lucid Dreams - Juice WRLD', 'HUMBLE - Kendrick Lamar',
      'Closer - The Chainsmokers', 'Wake Me Up - Avicii', 'Titanium - David Guetta', 'Radioactive - Imagine Dragons', 'Believer - Imagine Dragons', 'Thunder - Imagine Dragons', 'Viva la Vida - Coldplay', 'Clocks - Coldplay', 'Fix You - Coldplay', 'Mr Brightside - The Killers',
      'Use Somebody - Kings of Leon', 'Seven Nation Army - The White Stripes', 'Little Lion Man - Mumford & Sons', 'Take Me to Church - Hozier', 'Riptide - Vance Joy', 'Feel Good Inc - Gorillaz', 'Africa - Toto', 'Dreams - Fleetwood Mac', 'Go Your Own Way - Fleetwood Mac', 'The Chain - Fleetwood Mac'
    ]
  },
  {
    id: 'celebrities',
    name: 'Celebrities',
    emoji: '⭐',
    isPremium: true,
    words: [
      'Taylor Swift', 'Beyoncé', 'Tom Hanks', 'Leonardo DiCaprio', 'Brad Pitt', 'Angelina Jolie', 'Dwayne Johnson', 'Chris Hemsworth', 'Zendaya', 'Timothée Chalamet',
      'Ariana Grande', 'Drake', 'Rihanna', 'Selena Gomez', 'The Weeknd', 'Justin Bieber', 'Billie Eilish', 'Ed Sheeran', 'Lady Gaga', 'Adele',
      'Kanye West', 'Jay-Z', 'Eminem', 'Post Malone', 'Travis Scott', 'Cardi B', 'Nicki Minaj', 'Megan Thee Stallion', 'Doja Cat', 'Lizzo',
      'Harry Styles', 'Olivia Rodrigo', 'Dua Lipa', 'Bad Bunny', 'BTS', 'Blackpink', 'Robert Downey Jr', 'Chris Evans', 'Scarlett Johansson', 'Chris Pratt',
      'Mark Ruffalo', 'Tom Holland', 'Benedict Cumberbatch', 'Jennifer Lawrence', 'Emma Stone', 'Margot Robbie', 'Ryan Gosling', 'Florence Pugh', 'Anya Taylor Joy', 'Gal Gadot',
      'Will Smith', 'Denzel Washington', 'Morgan Freeman', 'Samuel L Jackson', 'Keanu Reeves', 'Johnny Depp', 'Christian Bale', 'Ryan Reynolds', 'Jake Gyllenhaal', 'Pedro Pascal',
      'Meryl Streep', 'Cate Blanchett', 'Nicole Kidman', 'Charlize Theron', 'Natalie Portman', 'Sandra Bullock', 'Julia Roberts', 'Reese Witherspoon', 'Jennifer Aniston', 'Courteney Cox',
      'Steve Carell', 'John Krasinski', 'Millie Bobby Brown', 'Finn Wolfhard', 'Kim Kardashian', 'Kylie Jenner', 'Kendall Jenner', 'Kris Jenner', 'Miley Cyrus', 'Katy Perry',
      'Michael Jackson', 'Prince', 'Elvis Presley', 'Madonna', 'Whitney Houston', 'Mariah Carey', 'Celine Dion', 'Britney Spears', 'Shakira', 'Jennifer Lopez',
      'Oprah Winfrey', 'Ellen DeGeneres', 'Jimmy Fallon', 'Stephen Colbert', 'Gordon Ramsay', 'Cristiano Ronaldo', 'Lionel Messi', 'LeBron James', 'Tom Brady', 'Serena Williams',
      'Elon Musk', 'Bill Gates', 'Mark Zuckerberg', 'Barack Obama', 'Michelle Obama', 'Joe Biden', 'Donald Trump', 'Prince Harry', 'Meghan Markle', 'Prince William',
      'Kate Middleton', 'Queen Elizabeth', 'King Charles', 'David Beckham', 'Victoria Beckham', 'Blake Lively', 'John Legend', 'Chrissy Teigen', 'George Clooney', 'Emma Watson'
    ]
  }
];

// Pre-loaded example custom categories (anime & clash royale as examples)
export const DEFAULT_CUSTOM_CATEGORIES: Category[] = [
  {
    id: 'custom-anime-example',
    name: 'Anime (Example)',
    isCustom: true,
    words: [
      'Naruto', 'Sasuke', 'Sakura', 'Kakashi', 'Itachi', 'Madara', 'Obito', 'Minato', 'Jiraiya', 'Tsunade',
      'Goku', 'Vegeta', 'Gohan', 'Piccolo', 'Krillin', 'Trunks', 'Frieza', 'Cell', 'Majin Buu', 'Beerus',
      'Luffy', 'Zoro', 'Nami', 'Usopp', 'Sanji', 'Chopper', 'Robin', 'Franky', 'Brook', 'Jinbe',
      'Ace', 'Sabo', 'Shanks', 'Whitebeard', 'Kaido', 'Ichigo', 'Rukia', 'Renji', 'Byakuya', 'Kenpachi',
      'Aizen', 'Light Yagami', 'L', 'Ryuk', 'Misa', 'Edward Elric', 'Alphonse Elric', 'Roy Mustang', 'Eren Yeager', 'Mikasa Ackerman',
      'Armin Arlert', 'Levi', 'Erwin', 'Reiner', 'Annie', 'Tanjiro', 'Nezuko', 'Zenitsu', 'Inosuke', 'Giyu',
      'Shinobu', 'Rengoku', 'Tengen', 'Muzan', 'Deku', 'Bakugo', 'Todoroki', 'Uraraka', 'Iida', 'All Might',
      'Endeavor', 'Hawks', 'Shigaraki', 'Dabi', 'Gojo Satoru', 'Yuji Itadori', 'Megumi Fushiguro', 'Nobara', 'Sukuna', 'Nanami',
      'Saitama', 'Genos', 'Tatsumaki', 'Bang', 'Garou', 'Spike Spiegel', 'Jet Black', 'Faye Valentine', 'Edward', 'Lelouch',
      'Suzaku', 'C.C.', 'Gon', 'Killua', 'Kurapika', 'Leorio', 'Hisoka', 'Chrollo', 'Meruem', 'Kirito',
      'Asuna', 'Sinon', 'Kaneki', 'Touka', 'Hide', 'Kamina', 'Simon', 'Yoko', 'Mob', 'Reigen',
      'Senku', 'Taiju', 'Chrome', 'Kohaku', 'Thorfinn', 'Askeladd', 'Thors', 'Canute', 'Ainz', 'Albedo'
    ]
  },
  {
    id: 'custom-clash-example',
    name: 'Clash Royale (Example)',
    isCustom: true,
    words: [
      'Knight', 'Archers', 'Goblins', 'Giant', 'P.E.K.K.A', 'Minions', 'Balloon', 'Witch', 'Barbarians', 'Golem',
      'Skeletons', 'Valkyrie', 'Skeleton Army', 'Bomber', 'Musketeer', 'Baby Dragon', 'Prince', 'Wizard', 'Mini P.E.K.K.A', 'Giant Skeleton',
      'Hog Rider', 'Minion Horde', 'Ice Wizard', 'Royal Giant', 'Guards', 'Princess', 'Dark Prince', 'Three Musketeers', 'Lava Hound', 'Ice Spirit',
      'Fire Spirit', 'Miner', 'Sparky', 'Bowler', 'Lumberjack', 'Battle Ram', 'Inferno Dragon', 'Ice Golem', 'Mega Minion', 'Dart Goblin',
      'Goblin Gang', 'Electro Wizard', 'Elite Barbarians', 'Hunter', 'Executioner', 'Bandit', 'Royal Recruits', 'Night Witch', 'Bats', 'Royal Ghost',
      'Ram Rider', 'Zappies', 'Rascals', 'Cannon Cart', 'Mega Knight', 'Skeleton Barrel', 'Flying Machine', 'Wall Breakers', 'Royal Hogs', 'Goblin Giant',
      'Fisherman', 'Magic Archer', 'Electro Dragon', 'Firecracker', 'Mighty Miner', 'Elixir Golem', 'Battle Healer', 'Skeleton Dragons', 'Mother Witch', 'Electro Spirit',
      'Electro Giant', 'Golden Knight', 'Archer Queen', 'Skeleton King', 'Monk', 'Phoenix', 'Little Prince', 'Cannon', 'Goblin Hut', 'Mortar',
      'Inferno Tower', 'Bomb Tower', 'Barbarian Hut', 'Tesla', 'Elixir Collector', 'X-Bow', 'Tombstone', 'Furnace', 'Goblin Cage', 'Goblin Drill',
      'Arrows', 'Fireball', 'Zap', 'Poison', 'Freeze', 'Mirror', 'Rage', 'Tornado', 'Clone', 'Earthquake',
      'Barbarian Barrel', 'Heal Spirit', 'Giant Snowball', 'Royal Delivery', 'Graveyard', 'The Log', 'Lightning', 'Rocket'
    ]
  },
  {
    id: 'custom-nba-example',
    name: 'NBA Players (Example)',
    isCustom: true,
    words: [
      'LeBron James', 'Michael Jordan', 'Kobe Bryant', 'Stephen Curry', 'Kevin Durant', 'Giannis Antetokounmpo', 'Luka Doncic', 'Nikola Jokic', 'Joel Embiid', 'Jayson Tatum',
      'Damian Lillard', 'Anthony Davis', 'Kawhi Leonard', 'Paul George', 'Jimmy Butler', 'Devin Booker', 'Donovan Mitchell', 'Trae Young', 'Ja Morant', 'Zion Williamson',
      'Anthony Edwards', 'Shai Gilgeous-Alexander', 'De\'Aaron Fox', 'Tyrese Haliburton', 'Paolo Banchero', 'Victor Wembanyama', 'Scottie Barnes', 'Franz Wagner', 'Chet Holmgren', 'Evan Mobley',
      'Magic Johnson', 'Larry Bird', 'Kareem Abdul-Jabbar', 'Shaquille O\'Neal', 'Tim Duncan', 'Hakeem Olajuwon', 'David Robinson', 'Karl Malone', 'Charles Barkley', 'Patrick Ewing',
      'Allen Iverson', 'Dwyane Wade', 'Dirk Nowitzki', 'Kevin Garnett', 'Ray Allen', 'Paul Pierce', 'Vince Carter', 'Tracy McGrady', 'Steve Nash', 'Jason Kidd',
      'Chris Paul', 'Russell Westbrook', 'James Harden', 'Kyrie Irving', 'Carmelo Anthony', 'Dwight Howard', 'Chris Bosh', 'Blake Griffin', 'Derrick Rose', 'John Wall',
      'Klay Thompson', 'Draymond Green', 'Rudy Gobert', 'Karl-Anthony Towns', 'Bam Adebayo', 'Khris Middleton', 'Jrue Holiday', 'CJ McCollum', 'Bradley Beal', 'Zach LaVine',
      'DeMar DeRozan', 'Julius Randle', 'Pascal Siakam', 'Fred VanVleet', 'Domantas Sabonis', 'Jaren Jackson Jr', 'Desmond Bane', 'Brandon Ingram', 'Mikal Bridges', 'OG Anunoby',
      'Clyde Drexler', 'Reggie Miller', 'Scottie Pippen', 'Dennis Rodman', 'John Stockton', 'Gary Payton', 'Isiah Thomas', 'Moses Malone', 'Julius Erving', 'Wilt Chamberlain',
      'Bill Russell', 'Oscar Robertson', 'Jerry West', 'Elgin Baylor', 'Walt Frazier', 'Pete Maravich', 'George Gervin', 'Dominique Wilkins', 'Chris Mullin', 'Dikembe Mutombo',
      'Alonzo Mourning', 'Ben Wallace', 'Rasheed Wallace', 'Pau Gasol', 'Tony Parker', 'Manu Ginobili', 'Yao Ming', 'Grant Hill', 'Penny Hardaway', 'Stephon Marbury',
      'Baron Davis', 'Jamal Crawford', 'Joe Johnson', 'Amar\'e Stoudemire', 'LaMarcus Aldridge', 'Andre Iguodala', 'Kyle Lowry', 'Marc Gasol', 'Al Horford', 'Paul Millsap'
    ]
  },
  {
    id: 'custom-nfl-example',
    name: 'NFL Players (Example)',
    isCustom: true,
    words: [
      'Patrick Mahomes', 'Tom Brady', 'Aaron Rodgers', 'Josh Allen', 'Joe Burrow', 'Justin Herbert', 'Lamar Jackson', 'Jalen Hurts', 'Dak Prescott', 'Tua Tagovailoa',
      'Trevor Lawrence', 'CJ Stroud', 'Brock Purdy', 'Geno Smith', 'Daniel Jones', 'Justin Fields', 'Russell Wilson', 'Kirk Cousins', 'Matthew Stafford', 'Jared Goff',
      'Christian McCaffrey', 'Nick Chubb', 'Derrick Henry', 'Josh Jacobs', 'Saquon Barkley', 'Austin Ekeler', 'Tony Pollard', 'Bijan Robinson', 'Jahmyr Gibbs', 'Jonathan Taylor',
      'Tyreek Hill', 'Stefon Diggs', 'Justin Jefferson', 'Ja\'Marr Chase', 'CeeDee Lamb', 'AJ Brown', 'Davante Adams', 'Cooper Kupp', 'Amon-Ra St. Brown', 'DK Metcalf',
      'DeVonta Smith', 'Jaylen Waddle', 'Terry McLaurin', 'Garrett Wilson', 'Chris Olave', 'Puka Nacua', 'Travis Kelce', 'George Kittle', 'Mark Andrews', 'TJ Hockenson',
      'Dalton Kincaid', 'Evan Engram', 'Sam LaPorta', 'Micah Parsons', 'Nick Bosa', 'Myles Garrett', 'TJ Watt', 'Danielle Hunter', 'Chris Jones', 'Aaron Donald',
      'Maxx Crosby', 'Rashan Gary', 'Josh Allen Edge', 'Khalil Mack', 'Von Miller', 'Roquan Smith', 'Fred Warner', 'Demario Davis', 'Bobby Wagner', 'Devin White',
      'Darius Leonard', 'Jalen Ramsey', 'Sauce Gardner', 'Patrick Surtain', 'Jaire Alexander', 'Trevon Diggs', 'Denzel Ward', 'Marshon Lattimore', 'Derwin James', 'Minkah Fitzpatrick',
      'Jerry Rice', 'Joe Montana', 'Walter Payton', 'Lawrence Taylor', 'Jim Brown', 'Emmitt Smith', 'Barry Sanders', 'Peyton Manning', 'Brett Favre', 'Dan Marino',
      'John Elway', 'Troy Aikman', 'Steve Young', 'Terry Bradshaw', 'Roger Staubach', 'Johnny Unitas', 'Reggie White', 'Bruce Smith', 'Deion Sanders', 'Ronnie Lott',
      'Ray Lewis', 'Dick Butkus', 'Mike Singletary', 'Randy Moss', 'Terrell Owens', 'Calvin Johnson', 'Larry Fitzgerald', 'Tony Gonzalez', 'Rob Gronkowski', 'Ed Reed',
      'Troy Polamalu', 'Charles Woodson', 'Rod Woodson', 'Champ Bailey', 'Darrelle Revis', 'Adrian Peterson', 'LaDainian Tomlinson', 'Marshall Faulk', 'Curtis Martin', 'Eric Dickerson'
    ]
  }
];
