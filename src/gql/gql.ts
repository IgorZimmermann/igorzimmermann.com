/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n\tquery GetFoldersInContainer($container: String!) {\n\t\tgetFoldersInContainer(container: $container) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n": types.GetFoldersInContainerDocument,
    "\n\tquery GetBlobUrlsByFolder($folder: String!, $container: String!) {\n\t\tgetBlobUrlsByFolder(folder: $folder, container: $container) {\n\t\t\tmessage {\n\t\t\t\tlabel\n\t\t\t\turl\n\t\t\t\tserial\n\t\t\t}\n\t\t\tstatus\n\t\t}\n\t}\n": types.GetBlobUrlsByFolderDocument,
    "\n\tquery GetBlobById($getBlobByIdId: String!) {\n\t\tgetBlobById(id: $getBlobByIdId) {\n\t\t\tstatus\n\t\t\tmessage {\n\t\t\t\tlabel\n\t\t\t\tserial\n\t\t\t\turl\n\t\t\t}\n\t\t}\n\t}\n": types.GetBlobByIdDocument,
    "\n\tmutation ChangeBlobSerial($serial: Int!, $changeBlobSerialId: String!) {\n\t\tchangeBlobSerial(serial: $serial, id: $changeBlobSerialId) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n": types.ChangeBlobSerialDocument,
    "\n\tmutation ChangeBlobLabel($label: String!, $changeBlobLabelId: String!) {\n\t\tchangeBlobLabel(label: $label, id: $changeBlobLabelId) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n": types.ChangeBlobLabelDocument,
    "\n\tmutation DeleteBlob($deleteBlobId: String!) {\n\t\tdeleteBlob(id: $deleteBlobId) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n": types.DeleteBlobDocument,
    "\n\tmutation CreateFolderInContainer($folder: String!, $container: String!) {\n\t\tcreateFolderInContainer(folder: $folder, container: $container) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n": types.CreateFolderInContainerDocument,
    "\n\tquery Me {\n\t\tme {\n\t\t\tisAuthorised\n\t\t\tuser {\n\t\t\t\tusername\n\t\t\t\tcontainers\n\t\t\t}\n\t\t}\n\t}\n": types.MeDocument,
    "\n\tquery GetBlobUrlsByLabel(\n\t\t$label: String!\n\t\t$folder: String!\n\t\t$container: String!\n\t) {\n\t\tgetBlobUrlsByLabel(label: $label, folder: $folder, container: $container) {\n\t\t\tstatus\n\t\t\tmessage {\n\t\t\t\turl\n\t\t\t\tlabel\n\t\t\t}\n\t\t}\n\t}\n": types.GetBlobUrlsByLabelDocument,
    "\n\tmutation LoginUser($password: String!, $username: String!) {\n\t\tloginUser(password: $password, username: $username) {\n\t\t\tstatus\n\t\t}\n\t}\n": types.LoginUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetFoldersInContainer($container: String!) {\n\t\tgetFoldersInContainer(container: $container) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetFoldersInContainer($container: String!) {\n\t\tgetFoldersInContainer(container: $container) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetBlobUrlsByFolder($folder: String!, $container: String!) {\n\t\tgetBlobUrlsByFolder(folder: $folder, container: $container) {\n\t\t\tmessage {\n\t\t\t\tlabel\n\t\t\t\turl\n\t\t\t\tserial\n\t\t\t}\n\t\t\tstatus\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetBlobUrlsByFolder($folder: String!, $container: String!) {\n\t\tgetBlobUrlsByFolder(folder: $folder, container: $container) {\n\t\t\tmessage {\n\t\t\t\tlabel\n\t\t\t\turl\n\t\t\t\tserial\n\t\t\t}\n\t\t\tstatus\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetBlobById($getBlobByIdId: String!) {\n\t\tgetBlobById(id: $getBlobByIdId) {\n\t\t\tstatus\n\t\t\tmessage {\n\t\t\t\tlabel\n\t\t\t\tserial\n\t\t\t\turl\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetBlobById($getBlobByIdId: String!) {\n\t\tgetBlobById(id: $getBlobByIdId) {\n\t\t\tstatus\n\t\t\tmessage {\n\t\t\t\tlabel\n\t\t\t\tserial\n\t\t\t\turl\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation ChangeBlobSerial($serial: Int!, $changeBlobSerialId: String!) {\n\t\tchangeBlobSerial(serial: $serial, id: $changeBlobSerialId) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ChangeBlobSerial($serial: Int!, $changeBlobSerialId: String!) {\n\t\tchangeBlobSerial(serial: $serial, id: $changeBlobSerialId) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation ChangeBlobLabel($label: String!, $changeBlobLabelId: String!) {\n\t\tchangeBlobLabel(label: $label, id: $changeBlobLabelId) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ChangeBlobLabel($label: String!, $changeBlobLabelId: String!) {\n\t\tchangeBlobLabel(label: $label, id: $changeBlobLabelId) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteBlob($deleteBlobId: String!) {\n\t\tdeleteBlob(id: $deleteBlobId) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteBlob($deleteBlobId: String!) {\n\t\tdeleteBlob(id: $deleteBlobId) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateFolderInContainer($folder: String!, $container: String!) {\n\t\tcreateFolderInContainer(folder: $folder, container: $container) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateFolderInContainer($folder: String!, $container: String!) {\n\t\tcreateFolderInContainer(folder: $folder, container: $container) {\n\t\t\tstatus\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Me {\n\t\tme {\n\t\t\tisAuthorised\n\t\t\tuser {\n\t\t\t\tusername\n\t\t\t\tcontainers\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Me {\n\t\tme {\n\t\t\tisAuthorised\n\t\t\tuser {\n\t\t\t\tusername\n\t\t\t\tcontainers\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetBlobUrlsByLabel(\n\t\t$label: String!\n\t\t$folder: String!\n\t\t$container: String!\n\t) {\n\t\tgetBlobUrlsByLabel(label: $label, folder: $folder, container: $container) {\n\t\t\tstatus\n\t\t\tmessage {\n\t\t\t\turl\n\t\t\t\tlabel\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetBlobUrlsByLabel(\n\t\t$label: String!\n\t\t$folder: String!\n\t\t$container: String!\n\t) {\n\t\tgetBlobUrlsByLabel(label: $label, folder: $folder, container: $container) {\n\t\t\tstatus\n\t\t\tmessage {\n\t\t\t\turl\n\t\t\t\tlabel\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation LoginUser($password: String!, $username: String!) {\n\t\tloginUser(password: $password, username: $username) {\n\t\t\tstatus\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LoginUser($password: String!, $username: String!) {\n\t\tloginUser(password: $password, username: $username) {\n\t\t\tstatus\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;