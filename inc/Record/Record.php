<?php 

namespace F4\Record;

class Record {

    public $id;
    public $title;
    public $description;
    public $summary;
    public $image;
    public $author;

    public function exportAsArray() {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'summary' => $this->summary,
            'image' => $this->image,
            'author' => $this->author,
        ];
    }
}