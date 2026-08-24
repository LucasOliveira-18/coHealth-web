TAILWIND_VERSION := v4.3.3
TAILWIND_BIN := ./tailwindcss
INPUT_CSS := css/input.css
OUTPUT_CSS := css/output.css

.PHONY: all build watch download clean

all: build

## Compile Tailwind CSS from css/input.css to css/output.css
build: $(TAILWIND_BIN)
	$(TAILWIND_BIN) -i $(INPUT_CSS) -o $(OUTPUT_CSS) --minify

## Rebuild on file changes
watch: $(TAILWIND_BIN)
	$(TAILWIND_BIN) -i $(INPUT_CSS) -o $(OUTPUT_CSS) --watch

## Fetch the pinned Tailwind standalone binary if missing
$(TAILWIND_BIN):
	curl -fsSL -o $(TAILWIND_BIN) https://github.com/tailwindlabs/tailwindcss/releases/download/$(TAILWIND_VERSION)/tailwindcss-linux-x64
	chmod +x $(TAILWIND_BIN)

## Remove the downloaded binary (re-fetch with `make`)
clean:
	rm -f $(TAILWIND_BIN) $(OUTPUT_CSS)
