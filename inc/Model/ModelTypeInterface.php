<?php 

namespace F4\Model;

interface ModelTypeInterface
{
    public function getType(): string;

    public function getLabel(): string;

    public function getStorage(): string;

    public function load($modelId): array;

    public function save($modelId, array $data): void;

    public function delete($modelId): void;
}
