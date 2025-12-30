package store

import (
	"encoding/json"
	"os"
	"path/filepath"
	"sync"

	"github.com/lugvitc/whats4linux/internal/misc"
)

type settings struct {
	mu   sync.Mutex
	f    *os.File
	data map[string]any
}

var settingsInstance = &settings{
	data: make(map[string]any),
}

func LoadSettings() {
	var err error
	settingsInstance.f, err = os.Open(filepath.Join(misc.ConfigDir, "app_settings.json"))
	if err != nil {
		panic(err)
	}

	decoder := json.NewDecoder(settingsInstance.f)
	err = decoder.Decode(&settingsInstance.data)
	if err != nil {
		panic(err)
	}
}

func GetSettings() map[string]any {
	return settingsInstance.data
}

func SaveSettings(data map[string]any) error {
	settingsInstance.data = data

	settingsInstance.mu.Lock()
	defer settingsInstance.mu.Unlock()

	// Truncate the file before writing
	err := settingsInstance.f.Truncate(0)
	if err != nil {
		return err
	}

	// Reset the file offset to the beginning
	_, err = settingsInstance.f.Seek(0, 0)
	if err != nil {
		return err
	}

	encoder := json.NewEncoder(settingsInstance.f)
	err = encoder.Encode(settingsInstance.data)
	if err != nil {
		return err
	}

	return nil
}

func CloseSettings() error {
	return settingsInstance.f.Close()
}
