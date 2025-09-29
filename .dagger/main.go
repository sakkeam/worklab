// A generated module for HelloDagger functions
//
// This module has been generated via dagger init and serves as a reference to
// basic module structure as you get started with Dagger.
//
// Two functions have been pre-created. You can modify, delete, or add to them,
// as needed. They demonstrate usage of arguments and return types using simple
// echo and grep commands. The functions can be called from the dagger CLI or
// from one of the SDKs.
//
// The first line in this comment block is a short description line and the
// rest is a long description with more detail on the module's purpose or usage,
// if appropriate. All modules should have a short description.

package main

import (
	"context"
	"dagger/hello-dagger/internal/dagger"
)

type HelloDagger struct{}

// Returns a container that echoes whatever string argument is provided
func (m *HelloDagger) ContainerEcho(stringArg string) *dagger.Container {
	return dag.Container().From("alpine:latest").WithExec([]string{"echo", stringArg})
}

// Returns lines that match a pattern in the files of the provided Directory
func (m *HelloDagger) GrepDir(ctx context.Context, directoryArg *dagger.Directory, pattern string) (string, error) {
	return dag.Container().
		From("alpine:latest").
		WithMountedDirectory("/mnt", directoryArg).
		WithWorkdir("/mnt").
		WithExec([]string{"grep", "-R", pattern, "."}).
		Stdout(ctx)
}

func (m *HelloDagger) FrontendBuild(
	// +ignore=["**/node_modules"]
	directoryArg *dagger.Directory,
) *dagger.Container {
	return dag.Container().
		From("oven/bun:1").
		WithMountedDirectory("/mnt", directoryArg).
		WithWorkdir("/mnt").
		WithExec([]string{"bun", "install"}).
		WithExec([]string{"bun", "build:frontend"})
}

func (m *HelloDagger) FrontendDeploy(
	// +ignore=["**/node_modules"]
	directoryArg *dagger.Directory,
	cloudflareAPIToken *dagger.Secret,
	cloudflareAccountID *dagger.Secret,
	projectName string,
) *dagger.Container {
	return dag.Container().
		From("oven/bun:1").
		WithMountedDirectory("/mnt", m.FrontendBuild(directoryArg).Directory("packages/frontend")).
		WithWorkdir("/mnt").
		WithSecretVariable("CLOUDFLARE_API_TOKEN", cloudflareAPIToken).
		WithSecretVariable("CLOUDFLARE_ACCOUNT_ID", cloudflareAccountID).
		WithExec([]string{"sh", "-c", "bunx wrangler@latest pages deploy --project-name " + projectName + " dist"})
}

func (m *HelloDagger) BackendBuild(
	// +ignore=["**/node_modules"]
	directoryArg *dagger.Directory,
) *dagger.Container {
	return dag.Container().
		From("oven/bun:1").
		WithMountedDirectory("/mnt", directoryArg).
		WithWorkdir("/mnt").
		WithExec([]string{"bun", "install"}).
		WithExec([]string{"bun", "build:backend"})
}

func (m *HelloDagger) BackendDeploy(
	// +ignore=["**/node_modules"]
	directoryArg *dagger.Directory,
	cloudflareAPIToken *dagger.Secret,
	cloudflareAccountID *dagger.Secret,
) *dagger.Container {
	return dag.Container().
		From("oven/bun:1").
		WithMountedDirectory("/mnt", m.BackendBuild(directoryArg).Directory("packages/backend")).
		WithWorkdir("/mnt").
		WithSecretVariable("CLOUDFLARE_API_TOKEN", cloudflareAPIToken).
		WithSecretVariable("CLOUDFLARE_ACCOUNT_ID", cloudflareAccountID).
		WithExec([]string{"sh", "-c", "bunx wrangler@latest deploy dist/index.js"})
}
