<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
              'name' => 'Beaches', 'slug' => 'beaches'
            ], 
            [
              'name' => 'Forests', 'slug' => 'forests'
            ], 
            [
              'name' => 'Parks', 'slug' => 'parks'
            ], 
            [
              'name' => 'Viewpoints', 'slug' => 'viewpoints'
            ], 
            [
              'name' => 'Hills', 'slug' => 'hills'
            ], 
            [
              'name' => 'Builds', 'slug' => 'builds'
            ], 
            [
              'name' => 'Lakes', 'slug' => 'lakes'
            ], 
            [
              'name' => 'Others', 'slug' => 'others'
            ]
        ];

        foreach($categories as $cat){
            Category::create($cat);
        }
    }
}
