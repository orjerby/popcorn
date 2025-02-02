import { JSONFilePreset } from 'lowdb/node'
import type { DatabaseSchema } from '../models/product.ts'

const defaultData: DatabaseSchema = {
  products: [
    {
      id: 'cinnamon-sugar-twists-1',
      title: 'Cinnamon Sugar Twists',
      count: 4,
      description:
        'We’re bringing a new twist to the snack game! The irresistible Pipcorn crunch meets the classic flavor, Cinnamon Sugar, for a uniquely satisfying, omg-I-finished-the-bag snacking experience. Our all-new Twists are made with sustainability in mind by using upcycled Heirloom corn flour to create a flavor-packed shape that’s light, airy, and oh-so-crispy! You might even forget that Twists are better for you, too!',
      size: '4-PACK',
      price: 20,
      type: 'Twists',
      flavor: 'Cinnamon Sugar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/products/cinnamon-sugar-twists-pipcorn-381635.png',
        'https://www.pipsnacks.com/cdn/shop/products/cinnamon-sugar-twists-pipcorn-303224.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_CS_Twists.png',
        'https://www.pipsnacks.com/cdn/shop/products/cinnamon-sugar-twists-pipcorn-913850.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_CSTwists_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/51xScvPDjsL.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'sea-salt-heirloom-corn-dippers',
      title: 'Sea Salt Corn Dippers',
      count: 4,
      description:
        'Just three ingredients to make the oh-my-gosh-this-is-so-much-better-than-every-other-corn-chip corn chip? You bet! Our heirloom corn steps up and shines in this dipper that begs to be dunked (or enjoyed on its own – preferably by the handful). Flaky, light, with just the right touch of salt, and non-GMO and gluten-free. Crunched your way to the bottom of the bag on the first open? That’s okay because Heirloom Makes It Better.',
      size: '4-9.25oz Bags',
      price: 20,
      type: 'Dippers',
      flavor: 'Sea Salt',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC_Dippers_SS_9.25oz_12.25R_112023-render-front.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC24_NFP-Ingred_Assets_1080_SS_Dippers.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC24_Single_Bag-Pour-Full-Snack_Size_SS_Dippers_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC24_WhyHeirloom_AmazonAssets_Pipcorn_SS_Dippers_1.png',
      ],
      reviews: [],
    },
    {
      id: 'sea-salt-mini-heirloom-popcorn',
      title: 'Sea Salt Mini Popcorn',
      count: 4,
      description:
        'The OG snack that started it all. Once upon a time, our founders came to Shark Tank armed with bags of mini popcorn made from sustainably grown, delicious heirloom corn…and the rest is history. Just four simple ingredients (and no artificial anything!) make for perfectly crunchy, totally mindful snacking. Plus, it’s seasoned with the perfect amount of salt so that it gives you everything you’re craving (and nothing that you aren’t). Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz Bags',
      price: 18,
      type: 'Popcorn',
      flavor: 'Sea Salt',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC-Popcorn_SeaSalt_4.5oz_010323-render-front_f545c79e-39e4-407e-b2f1-e9fc82d9c085.png',
        'https://www.pipsnacks.com/cdn/shop/files/snackvspantry_ad_Pipcorn-8_seasaltpopcorn_2a173ec7-3af7-434c-8db6-47ac71a76a57.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_SS_Popcorn.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_SSPopcorn_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/Callouts_Pipcorn_SSPopcorn.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/61UyuIl7nzL.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png?v=1726603615&width=713',
      ],
      reviews: [],
    },
    {
      id: 'cheddar-heirloom-cheese-balls',
      title: 'Cheddar Cheese Balls',
      count: 4,
      description:
        'When you crave cheddar, only real cheddar will do – especially when every perfectly poppable bite brings back childhood memories of a snack you loved then and love now. It’s just like you remember – but better tasting, made better (baked, not fried), and with better ingredients that are better for you. All real, non-GMO, and gluten free. Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz Bags',
      price: 20,
      type: 'Cheese Balls',
      flavor: 'Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC_CB_Cheddar_4.5oz_010523-render-front_4702fe4f-0c3d-40d7-a3de-0cdda0f8662d.png',
        'https://www.pipsnacks.com/cdn/shop/files/snackvspantry_ad_Pipcorn-8_cheeseballs.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_CCB.png',
        'https://www.pipsnacks.com/cdn/shop/files/Callouts_Pipcorn_CCB.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_CCB_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/61g6m5Pt7ZL.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'truffle-mini-heirloom-popcorn',
      title: 'Truffle Mini Popcorn',
      count: 4,
      description:
        'Spoiler alert: Truffle should never be confined to just haute cuisine. Which is why we decided to make an elevated popcorn for the people. Distinctive, savory flavor meets our sustainably grown, deliciously crunchy heirloom corn for a mindful snack that only tastes decadent. It’s also non-GMO, gluten free, and perfectly seasoned, so that it gives you everything you’re craving (and nothing that you aren’t). Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz Bags',
      price: 18,
      type: 'Popcorn',
      flavor: 'Truffle',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC-Popcorn_Truffle_4.5oz_010323-render-front_7beebedc-e973-43e5-af88-a6fbe1848bd5.png',
        'https://www.pipsnacks.com/cdn/shop/files/snackvspantry_ad_Pipcorn-8_trufflepopcorn.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_Truff_Popcorn.png',
        'https://www.pipsnacks.com/cdn/shop/files/Callouts_Pipcorn_TrufflePop.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/513wcpx_OBL_353aef23-4d53-4bc7-b0c1-86dd23bb543a.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_TrufPopcorn_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'sea-salt-twists',
      title: 'Sea Salt Twists',
      count: 4,
      description:
        'We’re bringing a new twist to the snack game! The irresistible Pipcorn crunch meets the classic flavor, Sea Salt, for a uniquely satisfying, omg-I-finished-the-bag snacking experience. Our all-new Twists are made with sustainability in mind by using upcycled Heirloom corn flour to create a flavor-packed shape that’s light, airy, and oh-so-crispy! You might even forget that Twists are better for you, too!',
      size: '4-4.5oz Bags',
      price: 20,
      type: 'Twists',
      flavor: 'Sea Salt',
      images: [
        'https://www.pipsnacks.com/cdn/shop/products/sea-salt-twists-twists-pipcorn-4-bags-776080.png',
        'https://www.pipsnacks.com/cdn/shop/products/sea-salt-twists-twists-pipcorn-111417.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_SS_Twists.png',
        'https://www.pipsnacks.com/cdn/shop/products/51KduHhrzAL.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/51m99YfMmlL.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_SSTwists_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'jalapeno-cheddar-heirloom-cheese-balls',
      title: 'Jalapeño Cheddar Cheese Balls',
      count: 4,
      description:
        'We took endlessy snackable, added real cheddar cheese, and then decided to bring the heat! These are perfectly poppable bites with a personality all their own – and our grown-up take on a snack shape you’ve loved since childhood. Every handful is baked, not fried, and made with better-for-you ingredients that are also organic, non-GMO, and gluten free. Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz Bags',
      price: 20,
      type: 'Cheese Balls',
      flavor: 'Jalapeño Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC_JalapenoCB-frontbag_1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_Jalapeno_CB.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC24_Single_Bag-Pour-Full-Snack_Size_Jalapeno_CB_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_JalapenoCB_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'cheddar-crunchies',
      title: 'Cheddar Crunchies',
      count: 4,
      description:
        'We don’t put ‘crunch’ in a name unless we mean it – and this level of crunch and real cheddar cheese combine for a snack you simply can’t put down (but not the kind you have to wipe off your fingers every time you reach for another handful). You won’t feel the least bit of guilt about our better for you, non-GMO, gluten free crunchies, because they’re simply that addictive. Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-7oz Bags',
      price: 20,
      type: 'Crunchies',
      flavor: 'Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC_Crunchies_Cheddar_7oz_042123-front-render.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_Ched_Crunchies.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_ChedCrunchies_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'white-cheddar-cheese-balls',
      title: 'White Cheddar Cheese Balls',
      count: 4,
      description:
        'When you crave white cheddar, only real white cheddar will do – especially when every perfectly poppable bite brings back childhood memories of a snack you loved then and love now. It’s just like you remember – but better tasting, made better (baked, not fried), and with better ingredients that are better for you. All organic, non-GMO and gluten free. Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz bags',
      price: 20,
      type: 'Cheese Balls',
      flavor: 'White Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/products/PC_CB_WhiteCheddar_4.5oz_010523-render-front.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_WCCB.png',
        'https://www.pipsnacks.com/cdn/shop/files/Callouts_Pipcorn_WCCB.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/5138PBu0bhL_65aee9e6-e7d4-4371-a6e2-ea2d5ffd4f0f.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_WCCB_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png?v=1726603615&width=713',
      ],
      reviews: [],
    },
    {
      id: 'honey-barbeque-twists',
      title: 'Honey Barbeque Twists',
      count: 4,
      description:
        'We’re bringing a new twist to the snack game! The irresistible Pipcorn crunch meets the classic flavor, Honey BBQ, for a uniquely satisfying, omg-I-finished-the-bag snacking experience. Our all-new Twists are made with sustainability in mind by using upcycled Heirloom corn flour to create a flavor-packed shape that’s light, airy, and oh-so-crispy! You might even forget that Twists are better for you, too!',
      size: '4-4.5oz Bags',
      price: 20,
      type: 'Twists',
      flavor: 'Honey Barbeque',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/850012337867_front.png',
        'https://www.pipsnacks.com/cdn/shop/files/HoneyBBQTwistsBagBack_1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_HoneyBBQ_Twists.png',
        'https://www.pipsnacks.com/cdn/shop/files/HoneyBBQTwistsBagPourClaims_1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/HoneyBBQTwistsWhyHeirloom_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/HoneyBBQTwistsLifestyle-Details11-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png?v=1726603615&width=713',
      ],
      reviews: [],
    },

    {
      id: 'cheddar-fries',
      title: 'Cheddar Fries',
      count: 4,
      description:
        "There was a time when we couldn't put those french fry chips down! But when we peeked at the ingredient list, we decided to take matters into our own hands and create something we truly feel good about eating and sharing. Inspired by the classic snack, but elevated with premium, heirloom corn and real Non-GMO ingredients. Our heirloom Fries are baked to perfection, boasting a light, crispy french fry texture that's both airy and crunchy. So go ahead and keep munching. We hope you love them as much as we do!",
      size: '4-5oz Bags',
      price: 20,
      type: 'Fries',
      flavor: 'Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Cheddar-Bag-Front-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_CHED_FRIES.png',
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Cheddar-_Bag-Pour-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_ChedFries_1500px_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/CheddarFries-Lifestyle-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'firey-fries',
      title: 'Fiery Cheddar Fries',
      count: 4,
      description:
        "There was a time when we couldn't put those french fry chips down! But when we peeked at the ingredient list, we decided to take matters into our own hands and create something we truly feel good about eating and sharing. Inspired by the classic snack, but elevated with premium, heirloom corn and real Non-GMO ingredients. Our heirloom Fries are baked to perfection, boasting a light, crispy french fry texture that's both airy and crunchy. So go ahead and keep munching. We hope you love them as much as we do!",
      size: '4 - 5oz Bags',
      price: 20,
      type: 'Fries',
      flavor: 'Fiery',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Fiery-_Bag-Front-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_FIERY_FRIES.png',
        'https://www.pipsnacks.com/cdn/shop/files/fiery_fries_claims1-1_color_edit.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_FieryFries_1500px_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/fiery-lifestyle_1-1_color_edit.png',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'truffle-fries',
      title: 'Truffle Fries',
      count: 4,
      description:
        "There was a time when we couldn't put those french fry chips down! But when we peeked at the ingredient list, we decided to take matters into our own hands and create something we truly feel good about eating and sharing. Inspired by the classic snack, but elevated with premium, heirloom corn and real Non-GMO ingredients. Our heirloom Fries are baked to perfection, boasting a light, crispy french fry texture that's both airy and crunchy. So go ahead and keep munching. We hope you love them as much as we do!",
      size: '4 - 5oz Bags',
      price: 20,
      type: 'Fries',
      flavor: 'Truffle',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Truffle-Bag-Front-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_Truff_FRIES.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_TrufFries_1500px_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Truffle-Bag-Pour-1080_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/TruffleFries-Lifestyle-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'TWCINN45C12',
      title: 'Cinnamon Sugar Twists',
      count: 1,
      description:
        'We’re bringing a new twist to the snack game! The irresistible Pipcorn crunch meets the classic flavor, Cinnamon Sugar, for a uniquely satisfying, omg-I-finished-the-bag snacking experience. Our all-new Twists are made with sustainability in mind by using upcycled Heirloom corn flour to create a flavor-packed shape that’s light, airy, and oh-so-crispy! You might even forget that Twists are better for you, too!',
      size: '4-PACK',
      price: 5,
      type: 'Twists',
      flavor: 'Cinnamon Sugar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/products/cinnamon-sugar-twists-pipcorn-381635.png',
        'https://www.pipsnacks.com/cdn/shop/products/cinnamon-sugar-twists-pipcorn-303224.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_CS_Twists.png',
        'https://www.pipsnacks.com/cdn/shop/products/cinnamon-sugar-twists-pipcorn-913850.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_CSTwists_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/51xScvPDjsL.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'CDSS925C12',
      title: 'Sea Salt Corn Dippers',
      count: 1,
      description:
        'Just three ingredients to make the oh-my-gosh-this-is-so-much-better-than-every-other-corn-chip corn chip? You bet! Our heirloom corn steps up and shines in this dipper that begs to be dunked (or enjoyed on its own – preferably by the handful). Flaky, light, with just the right touch of salt, and non-GMO and gluten-free. Crunched your way to the bottom of the bag on the first open? That’s okay because Heirloom Makes It Better.',
      size: '4-9.25oz Bags',
      price: 5,
      type: 'Dippers',
      flavor: 'Sea Salt',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC_Dippers_SS_9.25oz_12.25R_112023-render-front.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC24_NFP-Ingred_Assets_1080_SS_Dippers.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC24_Single_Bag-Pour-Full-Snack_Size_SS_Dippers_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC24_WhyHeirloom_AmazonAssets_Pipcorn_SS_Dippers_1.png',
      ],
      reviews: [],
    },
    {
      id: 'PIPS45C12',
      title: 'Sea Salt Mini Popcorn',
      count: 1,
      description:
        'The OG snack that started it all. Once upon a time, our founders came to Shark Tank armed with bags of mini popcorn made from sustainably grown, delicious heirloom corn…and the rest is history. Just four simple ingredients (and no artificial anything!) make for perfectly crunchy, totally mindful snacking. Plus, it’s seasoned with the perfect amount of salt so that it gives you everything you’re craving (and nothing that you aren’t). Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz Bags',
      price: 4.5,
      type: 'Popcorn',
      flavor: 'Sea Salt',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC-Popcorn_SeaSalt_4.5oz_010323-render-front_f545c79e-39e4-407e-b2f1-e9fc82d9c085.png',
        'https://www.pipsnacks.com/cdn/shop/files/snackvspantry_ad_Pipcorn-8_seasaltpopcorn_2a173ec7-3af7-434c-8db6-47ac71a76a57.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_SS_Popcorn.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_SSPopcorn_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/Callouts_Pipcorn_SSPopcorn.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/61UyuIl7nzL.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png?v=1726603615&width=713',
      ],
      reviews: [],
    },
    {
      id: 'CBC45C12',
      title: 'Cheddar Cheese Balls',
      count: 1,
      description:
        'When you crave cheddar, only real cheddar will do – especially when every perfectly poppable bite brings back childhood memories of a snack you loved then and love now. It’s just like you remember – but better tasting, made better (baked, not fried), and with better ingredients that are better for you. All real, non-GMO, and gluten free. Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz Bags',
      price: 5,
      type: 'Cheese Balls',
      flavor: 'Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC_CB_Cheddar_4.5oz_010523-render-front_4702fe4f-0c3d-40d7-a3de-0cdda0f8662d.png',
        'https://www.pipsnacks.com/cdn/shop/files/snackvspantry_ad_Pipcorn-8_cheeseballs.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_CCB.png',
        'https://www.pipsnacks.com/cdn/shop/files/Callouts_Pipcorn_CCB.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_CCB_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/61g6m5Pt7ZL.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'PIPT45C12',
      title: 'Truffle Mini Popcorn',
      count: 1,
      description:
        'Spoiler alert: Truffle should never be confined to just haute cuisine. Which is why we decided to make an elevated popcorn for the people. Distinctive, savory flavor meets our sustainably grown, deliciously crunchy heirloom corn for a mindful snack that only tastes decadent. It’s also non-GMO, gluten free, and perfectly seasoned, so that it gives you everything you’re craving (and nothing that you aren’t). Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz Bags',
      price: 4.5,
      type: 'Popcorn',
      flavor: 'Truffle',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC-Popcorn_Truffle_4.5oz_010323-render-front_7beebedc-e973-43e5-af88-a6fbe1848bd5.png',
        'https://www.pipsnacks.com/cdn/shop/files/snackvspantry_ad_Pipcorn-8_trufflepopcorn.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_Truff_Popcorn.png',
        'https://www.pipsnacks.com/cdn/shop/files/Callouts_Pipcorn_TrufflePop.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/513wcpx_OBL_353aef23-4d53-4bc7-b0c1-86dd23bb543a.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_TrufPopcorn_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'TWSS45C12',
      title: 'Sea Salt Twists',
      count: 1,
      description:
        'We’re bringing a new twist to the snack game! The irresistible Pipcorn crunch meets the classic flavor, Sea Salt, for a uniquely satisfying, omg-I-finished-the-bag snacking experience. Our all-new Twists are made with sustainability in mind by using upcycled Heirloom corn flour to create a flavor-packed shape that’s light, airy, and oh-so-crispy! You might even forget that Twists are better for you, too!',
      size: '4-4.5oz Bags',
      price: 5,
      type: 'Twists',
      flavor: 'Sea Salt',
      images: [
        'https://www.pipsnacks.com/cdn/shop/products/sea-salt-twists-twists-pipcorn-4-bags-776080.png',
        'https://www.pipsnacks.com/cdn/shop/products/sea-salt-twists-twists-pipcorn-111417.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_SS_Twists.png',
        'https://www.pipsnacks.com/cdn/shop/products/51KduHhrzAL.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/51m99YfMmlL.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_SSTwists_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'CBJC45C12',
      title: 'Jalapeño Cheddar Cheese Balls',
      count: 1,
      description:
        'We took endlessy snackable, added real cheddar cheese, and then decided to bring the heat! These are perfectly poppable bites with a personality all their own – and our grown-up take on a snack shape you’ve loved since childhood. Every handful is baked, not fried, and made with better-for-you ingredients that are also organic, non-GMO, and gluten free. Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz Bags',
      price: 5,
      type: 'Cheese Balls',
      flavor: 'Jalapeño Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC_JalapenoCB-frontbag_1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_Jalapeno_CB.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC24_Single_Bag-Pour-Full-Snack_Size_Jalapeno_CB_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_JalapenoCB_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'CUCH7C12',
      title: 'Cheddar Cheese Crunchies',
      count: 1,
      description:
        'We don’t put ‘crunch’ in a name unless we mean it – and this level of crunch and real cheddar cheese combine for a snack you simply can’t put down (but not the kind you have to wipe off your fingers every time you reach for another handful). You won’t feel the least bit of guilt about our better for you, non-GMO, gluten free crunchies, because they’re simply that addictive. Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-7oz Bags',
      price: 5,
      type: 'Crunchies',
      flavor: 'Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/PC_Crunchies_Cheddar_7oz_042123-front-render.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_Ched_Crunchies.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_ChedCrunchies_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'CBWC45C12',
      title: 'White Cheddar Cheese Balls',
      count: 1,
      description:
        'When you crave white cheddar, only real white cheddar will do – especially when every perfectly poppable bite brings back childhood memories of a snack you loved then and love now. It’s just like you remember – but better tasting, made better (baked, not fried), and with better ingredients that are better for you. All organic, non-GMO and gluten free. Crunched your way to the bottom of the bag on the first open? That’s okay, because Heirloom Makes It Better.',
      size: '4-4.5oz bags',
      price: 5,
      type: 'Cheese Balls',
      flavor: 'White Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/products/PC_CB_WhiteCheddar_4.5oz_010523-render-front.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_WCCB.png',
        'https://www.pipsnacks.com/cdn/shop/files/Callouts_Pipcorn_WCCB.jpg',
        'https://www.pipsnacks.com/cdn/shop/products/5138PBu0bhL_65aee9e6-e7d4-4371-a6e2-ea2d5ffd4f0f.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_WCCB_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png?v=1726603615&width=713',
      ],
      reviews: [],
    },
    {
      id: 'TWHB45C12',
      title: 'Honey Barbeque Twists',
      count: 1,
      description:
        'We’re bringing a new twist to the snack game! The irresistible Pipcorn crunch meets the classic flavor, Honey BBQ, for a uniquely satisfying, omg-I-finished-the-bag snacking experience. Our all-new Twists are made with sustainability in mind by using upcycled Heirloom corn flour to create a flavor-packed shape that’s light, airy, and oh-so-crispy! You might even forget that Twists are better for you, too!',
      size: '4-4.5oz Bags',
      price: 5,
      type: 'Twists',
      flavor: 'Honey Barbeque',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/850012337867_front.png',
        'https://www.pipsnacks.com/cdn/shop/files/HoneyBBQTwistsBagBack_1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_HoneyBBQ_Twists.png',
        'https://www.pipsnacks.com/cdn/shop/files/HoneyBBQTwistsBagPourClaims_1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/HoneyBBQTwistsWhyHeirloom_1500px.jpg',
        'https://www.pipsnacks.com/cdn/shop/files/HoneyBBQTwistsLifestyle-Details11-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png?v=1726603615&width=713',
      ],
      reviews: [],
    },
    {
      id: 'FRYCH50C12',
      title: 'Cheddar Fries',
      count: 1,
      description:
        "There was a time when we couldn't put those french fry chips down! But when we peeked at the ingredient list, we decided to take matters into our own hands and create something we truly feel good about eating and sharing. Inspired by the classic snack, but elevated with premium, heirloom corn and real Non-GMO ingredients. Our heirloom Fries are baked to perfection, boasting a light, crispy french fry texture that's both airy and crunchy. So go ahead and keep munching. We hope you love them as much as we do!",
      size: '4-5oz Bags',
      price: 5,
      type: 'Fries',
      flavor: 'Cheddar',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Cheddar-Bag-Front-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_CHED_FRIES.png',
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Cheddar-_Bag-Pour-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_ChedFries_1500px_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/CheddarFries-Lifestyle-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'FRYFC50C12',
      title: 'Fiery Fries',
      count: 1,
      description:
        "There was a time when we couldn't put those french fry chips down! But when we peeked at the ingredient list, we decided to take matters into our own hands and create something we truly feel good about eating and sharing. Inspired by the classic snack, but elevated with premium, heirloom corn and real Non-GMO ingredients. Our heirloom Fries are baked to perfection, boasting a light, crispy french fry texture that's both airy and crunchy. So go ahead and keep munching. We hope you love them as much as we do!",
      size: '4 - 5oz Bags',
      price: 5,
      type: 'Fries',
      flavor: 'Fiery',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Fiery-_Bag-Front-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_FIERY_FRIES.png',
        'https://www.pipsnacks.com/cdn/shop/files/fiery_fries_claims1-1_color_edit.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_FieryFries_1500px_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/fiery-lifestyle_1-1_color_edit.png',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
    {
      id: 'FRYTR50C12',
      title: 'Truffle Fries',
      count: 1,
      description:
        "There was a time when we couldn't put those french fry chips down! But when we peeked at the ingredient list, we decided to take matters into our own hands and create something we truly feel good about eating and sharing. Inspired by the classic snack, but elevated with premium, heirloom corn and real Non-GMO ingredients. Our heirloom Fries are baked to perfection, boasting a light, crispy french fry texture that's both airy and crunchy. So go ahead and keep munching. We hope you love them as much as we do!",
      size: '4 - 5oz Bags',
      price: 5,
      type: 'Fries',
      flavor: 'Truffle',
      images: [
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Truffle-Bag-Front-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/PC_NFP-Ingred_1080_Truff_FRIES.png',
        'https://www.pipsnacks.com/cdn/shop/files/WhyHeirloom_TrufFries_1500px_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/Fries-Truffle-Bag-Pour-1080_1.png',
        'https://www.pipsnacks.com/cdn/shop/files/TruffleFries-Lifestyle-1080.png',
        'https://www.pipsnacks.com/cdn/shop/files/FamilyProduct-UpdatedBags24-friesspill-1080.png',
      ],
      reviews: [],
    },
  ],
}

const db = await JSONFilePreset<DatabaseSchema>('db.json', defaultData)
await db.write()

export default db
