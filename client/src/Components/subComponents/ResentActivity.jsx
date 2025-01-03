const ResentActivity = () => {
    const  recentActivity= [
        { id: 1, user: "John Doe", action: "Created a new project", time: "2 hours ago" },
        { id: 2, user: "Jane Smith", action: "Completed a task", time: "4 hours ago" },
        { id: 3, user: "Bob Johnson", action: "Updated user profile", time: "1 day ago" },
        { id: 4, user: "Alice Brown", action: "Added a new task", time: "2 days ago" },
      ]
    return (
        <div className="space-y-8">
            {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.user}</p>
                        <p className="text-sm text-muted-foreground">
                            {item.action}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">{item.time}</div>
                </div>
            ))}
        </div>
    )
}
export default ResentActivity