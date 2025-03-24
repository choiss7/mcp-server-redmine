export declare const issueListResponse: {
    issues: {
        id: number;
        project: {
            id: number;
            name: string;
        };
        tracker: {
            id: number;
            name: string;
        };
        status: {
            id: number;
            name: string;
            is_closed: boolean;
        };
        priority: {
            id: number;
            name: string;
        };
        author: {
            id: number;
            name: string;
        };
        assigned_to: {
            id: number;
            name: string;
        };
        subject: string;
        description: string;
        start_date: string;
        due_date: string;
        done_ratio: number;
        is_private: boolean;
        estimated_hours: null;
        total_estimated_hours: null;
        spent_hours: number;
        total_spent_hours: number;
        custom_fields: {
            id: number;
            name: string;
            value: string;
        }[];
        created_on: string;
        updated_on: string;
        closed_on: null;
    }[];
    total_count: number;
    offset: number;
    limit: number;
};
export declare const singleIssueResponse: {
    issue: {
        id: number;
        project: {
            id: number;
            name: string;
        };
        tracker: {
            id: number;
            name: string;
        };
        status: {
            id: number;
            name: string;
            is_closed: boolean;
        };
        priority: {
            id: number;
            name: string;
        };
        author: {
            id: number;
            name: string;
        };
        assigned_to: {
            id: number;
            name: string;
        };
        subject: string;
        description: string;
        start_date: string;
        due_date: string;
        done_ratio: number;
        is_private: boolean;
        estimated_hours: null;
        total_estimated_hours: null;
        spent_hours: number;
        total_spent_hours: number;
        custom_fields: {
            id: number;
            name: string;
            value: string;
        }[];
        created_on: string;
        updated_on: string;
        closed_on: null;
    };
};
export declare const projectListResponse: {
    projects: {
        id: number;
        name: string;
        identifier: string;
        description: string;
        homepage: string;
        status: number;
        parent: {
            id: number;
            name: string;
        };
        created_on: string;
        updated_on: string;
        is_public: boolean;
        inherit_members: boolean;
        custom_fields: {
            id: number;
            name: string;
            value: string;
        }[];
        enabled_module_names: string[];
    }[];
    total_count: number;
    offset: number;
    limit: number;
};
export declare const singleProjectResponse: {
    project: {
        id: number;
        name: string;
        identifier: string;
        description: string;
        homepage: string;
        status: number;
        parent: {
            id: number;
            name: string;
        };
        created_on: string;
        updated_on: string;
        is_public: boolean;
        inherit_members: boolean;
        custom_fields: {
            id: number;
            name: string;
            value: string;
        }[];
        enabled_module_names: string[];
    };
};
export declare const singleProjectWithIncludesResponse: {
    project: {
        trackers: {
            id: number;
            name: string;
        }[];
        issue_categories: {
            id: number;
            name: string;
        }[];
        time_entry_activities: {
            id: number;
            name: string;
            is_default: boolean;
            active: boolean;
        }[];
        default_version: {
            id: number;
            name: string;
        };
        default_assignee: {
            id: number;
            name: string;
        };
        id: number;
        name: string;
        identifier: string;
        description: string;
        homepage: string;
        status: number;
        parent: {
            id: number;
            name: string;
        };
        created_on: string;
        updated_on: string;
        is_public: boolean;
        inherit_members: boolean;
        custom_fields: {
            id: number;
            name: string;
            value: string;
        }[];
        enabled_module_names: string[];
    };
};
export declare const issueCreateData: {
    readonly invalidIssue: {
        readonly project_id: 1;
        readonly priority_id: 2;
    };
    readonly nonExistentProject: {
        readonly project_id: 999;
        readonly subject: "Test issue";
        readonly priority_id: 2;
    };
    readonly normalIssue: {
        readonly project_id: 1;
        readonly subject: "Test issue";
        readonly priority_id: 2;
    };
};
export declare const timeEntryListResponse: {
    time_entries: {
        id: number;
        project: {
            id: number;
            name: string;
        };
        issue: {
            id: number;
        };
        user: {
            id: number;
            name: string;
        };
        activity: {
            id: number;
            name: string;
        };
        hours: number;
        comments: string;
        spent_on: string;
        created_on: string;
        updated_on: string;
        custom_fields: {
            id: number;
            name: string;
            value: string;
        }[];
    }[];
    total_count: number;
    offset: number;
    limit: number;
};
export declare const singleTimeEntryResponse: {
    time_entry: {
        id: number;
        project: {
            id: number;
            name: string;
        };
        issue: {
            id: number;
        };
        user: {
            id: number;
            name: string;
        };
        activity: {
            id: number;
            name: string;
        };
        hours: number;
        comments: string;
        spent_on: string;
        created_on: string;
        updated_on: string;
        custom_fields: {
            id: number;
            name: string;
            value: string;
        }[];
    };
};
export declare const userListResponse: {
    users: {
        id: number;
        login: string;
        firstname: string;
        lastname: string;
        mail: string;
        created_on: string;
        updated_on: string;
        last_login_on: string;
        passwd_changed_on: string;
        status: number;
        api_key: string;
        avatar_url: string;
    }[];
    total_count: number;
    offset: number;
    limit: number;
};
export declare const singleUserResponse: {
    user: {
        id: number;
        login: string;
        firstname: string;
        lastname: string;
        mail: string;
        created_on: string;
        updated_on: string;
        last_login_on: string;
        passwd_changed_on: string;
        status: number;
        api_key: string;
        avatar_url: string;
    };
};
export declare const singleUserWithIncludesResponse: {
    user: {
        custom_fields: {
            id: number;
            name: string;
            value: string;
        }[];
        memberships: {
            project: {
                id: number;
                name: string;
            };
            roles: {
                id: number;
                name: string;
            }[];
        }[];
        groups: {
            id: number;
            name: string;
        }[];
        id: number;
        login: string;
        firstname: string;
        lastname: string;
        mail: string;
        created_on: string;
        updated_on: string;
        last_login_on: string;
        passwd_changed_on: string;
        status: number;
        api_key: string;
        avatar_url: string;
    };
};
//# sourceMappingURL=fixtures.d.ts.map