/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBusiness = /* GraphQL */ `
  subscription OnCreateBusiness($owner: String!) {
    onCreateBusiness(owner: $owner) {
      id
      name
      image
      jobs {
        items {
          id
          businessId
          name
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBusiness = /* GraphQL */ `
  subscription OnUpdateBusiness($owner: String!) {
    onUpdateBusiness(owner: $owner) {
      id
      name
      image
      jobs {
        items {
          id
          businessId
          name
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBusiness = /* GraphQL */ `
  subscription OnDeleteBusiness($owner: String!) {
    onDeleteBusiness(owner: $owner) {
      id
      name
      image
      jobs {
        items {
          id
          businessId
          name
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob {
    onCreateJob {
      id
      businessId
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob {
    onUpdateJob {
      id
      businessId
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob {
    onDeleteJob {
      id
      businessId
      name
      createdAt
      updatedAt
    }
  }
`;
